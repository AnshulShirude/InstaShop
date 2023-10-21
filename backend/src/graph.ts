class Node {
  x: number;
  y: number;
  north: Node;
  south: Node;
  east: Node;
  west: Node;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  print() {
    return "X Coordinate:" + this.x + " Y Coordinate: " + this.y;
  }

  getNeighbors() {
    const NodeList: Node[] = [];
    if (this.north) {
      NodeList.push(this.north);
    }

    if (this.south) {
      NodeList.push(this.south);
    }
    if (this.west) {
      NodeList.push(this.west);
    }

    if (this.east) {
      NodeList.push(this.east);
    }

    return NodeList;
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

  linkCells() {
    if (this.NodeFrom.x === this.NodeTo.x) {
      if (this.NodeFrom.y > this.NodeTo.y) {
        this.NodeTo.south = this.NodeFrom;
        this.NodeFrom.north = this.NodeTo;
      } else {
        this.NodeTo.north = this.NodeFrom;
        this.NodeFrom.south = this.NodeTo;
      }
    } else {
      if (this.NodeFrom.x > this.NodeTo.x) {
        this.NodeTo.east = this.NodeFrom;
        this.NodeFrom.west = this.NodeTo;
      } else {
        this.NodeTo.west = this.NodeFrom;
        this.NodeFrom.east = this.NodeTo;
      }
    }
  }

  containsNodes(node1: Node, node2: Node) {
    const first = this.NodeFrom === node1 || this.NodeTo === node1;
    const second = this.NodeFrom === node2 || this.NodeTo === node2;

    return first && second;
  }
}

class Graph {
  board: Node[][];
  // list of edges
  edges: Edge[];
  // Translate a Ailse Name to A Node in a Graph
  itemTranslation: Map<string, Node>;
  visited: Node[];

  constructor(board: Node[][], edges: Edge[]) {
    this.board = board;
    this.edges = edges;
  }

  createAisles(upperLeft: Node, lowerRight: Node) {
    let leftX = upperLeft.x;
    let rightX = lowerRight.x;

    let northY = upperLeft.y;
    let southY = lowerRight.y;

    for (let i = leftX; i < rightX; i++) {
      for (let j = northY; j < southY; j++) {
        const currentNode = this.board[i][j];

        // Removing the horizontal edges needed
        if (i === leftX) {
          currentNode.east = null;
        } else if (i === rightX) {
          currentNode.west = null;
        } else {
          currentNode.east = null;
          currentNode.west = null;
        }

        // Removing the vertical edges needed
        if (j === northY) {
          currentNode.south = null;
        } else if (j === southY) {
          currentNode.north = null;
        } else {
          currentNode.north = null;
          currentNode.south = null;
        }
      }
    }
  }

  //
  dfs(
    board,
    posXLeft: number,
    posXRight: number,
    posYLeft: number,
    posYRight: number
  ) {
    if (
      posXLeft < 0 ||
      posXRight >= board.length ||
      posYLeft < 0 ||
      posYRight >= board[0].length ||
      visited[posXLeft][posYLeft]
    ) {
      return;
    }
  }

  // visited List
  // start -> grab -> neighbors
  //
  // eventually add in functionality to add in an item for an aisle
}

function createBoard(width: number, height: number) {
  let board = [];
  //create the 2D Grid
  for (let i = 0; i < width; i++) {
    board[i] = [];
  }

  //Populate the Grid with Nodes at each index
  for (let i = 0; i < width; i++) {
    for (let j = 0; j < height; j++) {
      board[i][j] = new Node(i, j);
    }
  }

  return board;
}

function linkNodes(board: Node[][]) {
  const height = board[0].length;
  const width = board.length;
  console.log("width: ", width);
  console.log("height: ", height);
  const edges: Edge[] = [];

  // this is for the columns
  for (let i = 0; i < width; i++) {
    for (let j = 0; j < height - 1; j++) {
      const currentCell = board[i][j];
      const nextCell = board[i][j + 1];

      const edge = new Edge(currentCell, nextCell);
      edges.push(edge);
    }
  }

  // this is for the rows
  for (let j = 0; j < height; j++) {
    for (let i = 0; i < width - 1; i++) {
      const currentCell = board[i][j];
      const nextCell = board[i + 1][j];

      const edge = new Edge(currentCell, nextCell);
      edges.push(edge);
    }
  }

  return edges;
}

function printGrid(graph) {
  const width = graph.board.length;
  const height = graph.board[0].length;

  for (let y = 0; y < height; y++) {
    let row = "";
    for (let x = 0; x < width; x++) {
      const node = graph.board[x][y];

      // Display a node with 'O' if present
      row += "O";

      // Display vertical edges with '|'
      if (node.south && x === width - 1) {
        row += "|";
      } else {
        row += " ";
      }

      // Display horizontal edges with '_'
      if (node.east && y === height - 1) {
        row += "_";
      } else {
        row += " ";
      }
    }
    console.log(row);
  }
}

function main() {
  // width, height
  const board = createBoard(3, 3);
  const edges = linkNodes(board);
  for (const edge of edges) {
    edge.linkCells();
  }

  const graph = new Graph(board, edges);

  console.log(edges.length);
  for (const edge of edges) {
    const NodeFromPrint = edge.NodeFrom.print();
    const NodeToPrint = edge.NodeTo.print();
    console.log(NodeFromPrint, "-", NodeToPrint);
  }

  // legit no idea, the rest of the data looks fine, it may be with how I print it I guess?
  // at least for a 2-D grid it looks fine, going to focus on removing edges, and see if this causes issues
  // I hope its just an issue within printing with for each loops, but idk
}

main();

export { Graph, createBoard, linkNodes };

// const canvas = document.getElementById("myCanvas") as HTMLCanvasElement;
// const context = canvas.getContext("2d");

// function drawLine(x1: number, y1: number, x2: number, y2: number) {
//   if (context) {
//     context.beginPath();
//     context.moveTo(x1, y1);
//     context.lineTo(x2, y2);
//     context.stroke();
//   }
// }
