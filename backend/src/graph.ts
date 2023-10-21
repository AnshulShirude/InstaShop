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

}

class Graph {
  board: Node[][];
  // list of edges
  edges: Edge[];
  // Translate a Ailse Name to A Node in a Graph
  itemTranslation: Map<string, Node>;
  visited: boolean[][];

  constructor(board: Node[][], edges: Edge[]) {
    this.board = board;
    this.edges = edges;
    this.itemTranslation = new Map();
  }

  inputAisleToNode(aisle: string, node :Node) {
    this.itemTranslation.set(aisle, node);
  };

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

  getShortestPath(nodesToCover: Node[]): Node[] | null {
    const m = this.board.length;
    const n = this.board[0].length;
    const start = this.board[m - 1][n - 1];
    const end = this.board[m - 1][0];
    const visited = new Array(m).fill(false).map(() => new Array(n).fill(false));
    const directions = [
      { dx: 0, dy: 1 },
      { dx: 1, dy: 0 },
      { dx: 0, dy: -1 },
      { dx: -1, dy: 0 }
    ];
  
    const isValid = (x: number, y: number) => x >= 0 && x < m && y >= 0 && y < n;
  
    const bestPathLen = [Infinity];
    let bestPathNodes: Node[] = [];
  
    const backtrack = (node: Node, covered: Set<Node>, pathLen: number, currentPath: Node[]) => {
      if (node === end && covered.size === nodesToCover.length) {
        if (pathLen < bestPathLen[0]) {
          bestPathLen[0] = pathLen;
          bestPathNodes = currentPath.slice();
        }
        return;
      }
      if (pathLen >= bestPathLen[0]) {
        return;
      }
      for (const { dx, dy } of directions) {
        const nx = node.x + dx;
        const ny = node.y + dy;
        if (isValid(nx, ny) && !visited[nx][ny]) {
          visited[nx][ny] = true;
          const nextNode = this.board[nx][ny];
          currentPath.push(nextNode);
          const nextCovered = new Set(covered);
          if (nodesToCover.some(target => target.x === nx && target.y === ny)) {
            nextCovered.add(nextNode);
          }
          backtrack(nextNode, nextCovered, pathLen + 1, currentPath);
          currentPath.pop();
          visited[nx][ny] = false;
        }
      }
    };
  
    visited[start.x][start.y] = true;
    backtrack(start, new Set(), 0, [start]);
  
    if (bestPathLen[0] !== Infinity) {
      return bestPathNodes;
    } else {
      return null;
    }
  }
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
  const board = createBoard(5, 5);
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
  let a = new Node(0, 0);
  let b = new Node(2, 3);
  let c = new Node(3, 4);
  let d = new Node(4, 4);

  const shortestPath = graph.getShortestPath([a, b, c, d]);
  if (shortestPath) {
    console.log("Shortest Path:");
    shortestPath.forEach(node => {
      console.log(node.print());
    });
  } else {
    console.log("No path found.");
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
