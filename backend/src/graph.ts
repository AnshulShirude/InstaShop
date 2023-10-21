class Node {
  x: Number;
  y: Number;
  north: Node;
  south: Node;
  east: Node;
  west: Node;

  constructor(x: Number, y: Number) {
    this.x = x;
    this.y = y;
  }
}

class Edge {
  NodeTo: Node;
  NodeFrom: Node;
  // distance:

  constructor(NodeTo: Node, NodeFrom: Node) {
    this.NodeTo = NodeTo;
    this.NodeFrom = NodeFrom;
  }
}

class Graph {
  board: Node[][];
  // list of edges
  edges: Edge[];
  // Translate a Ailse Name to A Node in a Graph
  itemTranslation: Map<string, Node>;

  constructor(board: Node[][], edges: Edge[]) {
    this.board = board;
    this.edges = edges;
  }

  removeBorder(
    upperLeft: number,
    upperRight: number,
    bottomLeft: number,
    bottomRight: number
  ) {
    for (let i = upperLeft; i < upperRight; i++) {
      for (let j = bottomLeft; j < bottomRight; j++) {
        const cell = this.board[i][j];

        cell.west = undefined;
      }
    }
  }

  createBoard(width: Number, height: Number) {
    for (let i = 0; i < width; i++) {
      for (let j = 0; j < height; j++) {
        this.board[i][j] = new Node(i, j);
      }
    }

    // linking the edges next to each other row
    for (let i = 0; i < width; i++) {
      let prevCell = this.board[i][0];
      for (let j = 0; j < height; j++) {
        let currCell = this.board[i][j];

        prevCell.east = currCell;
        currCell.west = prevCell;

        const edge = new Edge(prevCell, currCell);
        this.edges.push(edge);

        prevCell = currCell;
      }
    }

    // linking the edges next to each other column
    for (let i = 0; i < height; i++) {
      let prevCell = this.board[i][0];
      for (let j = 0; j < width; j++) {
        let currCell = this.board[i][j];

        prevCell.south = currCell;
        currCell.north = prevCell;

        const edge = new Edge(prevCell, currCell);
        this.edges.push(edge);

        prevCell = currCell;
      }
    }
  }

  // eventually add in functionality to add in an item for an aisle
}

function main() {
  // testData
}

main();
