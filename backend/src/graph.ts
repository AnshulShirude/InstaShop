class Node {
  constructor(public x: number, public y: number) {}

  withinBorder = false;
  north?: Node;
  south?: Node;
  east?: Node;
  west?: Node;

  print() {
    const neighbors = this.getNeighbors();
    return `Postion: (${this.x},${this.y}) Neighbors :${neighbors.map(neighbor => `(${neighbor.x},${neighbor.y})`).join('')}`;
  }

  getNeighbors(): Node[] {
    return [this.north, this.south, this.east, this.west].filter(Boolean) as Node[];
  }
}

class Edge {
  constructor(public NodeTo: Node, public NodeFrom: Node) {}

  linkCells() {
    if (this.NodeFrom.x === this.NodeTo.x) {
      if (this.NodeFrom.y > this.NodeTo.y) {
        [this.NodeTo.south, this.NodeFrom.north] = [this.NodeFrom, this.NodeTo];
      } else {
        [this.NodeTo.north, this.NodeFrom.south] = [this.NodeFrom, this.NodeTo];
      }
    } else {
      if (this.NodeFrom.x > this.NodeTo.x) {
        [this.NodeTo.east, this.NodeFrom.west] = [this.NodeFrom, this.NodeTo];
      } else {
        [this.NodeTo.west, this.NodeFrom.east] = [this.NodeFrom, this.NodeTo];
      }
    }
  }
}
class Graph {
  board: Node[][];
  // list of edges
  edges: Edge[];
  // Translate a Aisle Name to A Node in a Graph
  itemTranslation: Map<string, Node>;
  visited: boolean[][];
  pathFound: boolean;

  constructor(board: Node[][], edges: Edge[]) {
    this.board = board;
    this.edges = edges;
    this.visited = new Array(board.length);
    this.itemTranslation = new Map();

    for (let i = 0; i < board.length; i++) {
      this.visited[i] = new Array(board[0].length);
      for (let j = 0; j < board[0].length; j++) {
        this.visited[i][j] = false;
      }
    }
  }

  // adds an item on our Map to represent a Node
  createTransalation(aisleName: string, node: Node) {
    this.itemTranslation.set(aisleName, node);
  }

  createAisles(upperLeft: Node, lowerRight: Node) {
    let leftX = upperLeft.x;
    let rightX = lowerRight.x;

    let northY = upperLeft.y;
    let southY = lowerRight.y;

    for (let i = leftX; i <= rightX; i++) {
      for (let j = northY; j <= southY; j++) {
        const currentNode = this.board[i][j];
        currentNode.withinBorder = true;

        // Removing the horizontal edges needed

        if (i === leftX) {
          //unhook the upperNode
          const prevLeftNode = this.board[i - 1][j];
          prevLeftNode.east = null;

          currentNode.west = null;
        }

        if (i === rightX) {
          //unhook the upperNode
          const forwardRightNode = this.board[i + 1][j];
          forwardRightNode.west = null;

          currentNode.east = null;
        }

        if (j === southY) {
          const prevBelowNode = this.board[i][j + 1];
          prevBelowNode.north = null;

          currentNode.south = null;
        }

        if (j === northY) {
          const forwardBelowNode = this.board[i][j - 1];
          forwardBelowNode.south = null;

          currentNode.north = null;
        }
      }
    }
  }

  // List of Nodes Return Type
  dfs(
    currentPosX: number,
    currentPosY: number,
    endingPosX: number,
    endingPosY: number,
    path: Node[]
  ) {
    if (currentPosX === endingPosX && currentPosY === endingPosY) {
      this.pathFound = true;
      return path;
    }

    if (
      currentPosX < 0 ||
      currentPosX >= this.board.length ||
      currentPosY < 0 ||
      currentPosY >= this.board[0].length ||
      this.visited[currentPosX][currentPosY]
    ) {
      return;
    }

    this.visited[currentPosX][currentPosY] = true;

    const currentNode = this.board[currentPosX][currentPosY];
    // here we add the logic for if we can go left, right, up, or bottom
    const outNeighbors = currentNode.getNeighbors();
    for (const node of outNeighbors) {
      const newPath = [...path];
      newPath.push(node);

      // Recursive call with the new path
      const result = this.dfs(node.x, node.y, endingPosX, endingPosY, newPath);

      if (result) {
        // If the path is found in the recursive call, return it
        return result;
      }
    }
  }

  shortestPath(matrix: number[][], nodesToCover: [number, number][]) {
    const m = matrix.length;
    const n = matrix[0].length;
    const start: [number, number] = [m - 1, n - 1];
    const end: [number, number] = [0, n - 1];
    const visited = Array.from({ length: m }, () => Array(n).fill(false));
    const directions: [number, number][] = [
      [0, 1],
      [1, 0],
      [0, -1],
      [-1, 0],
    ];
    let bestPathLen = Infinity;
    let bestPathNodes: number[][] = [];

    const isValid = (x: number, y: number) =>
      0 <= x && x < m && 0 <= y && y < n;

    const backtrack = (
      x: number,
      y: number,
      covered: Set<[number, number]>,
      pathLen: number,
      currentPath: number[][]
    ) => {
      if (
        x === end[0] &&
        y === end[1] &&
        covered.size === nodesToCover.length
      ) {
        if (pathLen < bestPathLen) {
          bestPathLen = pathLen;
          bestPathNodes = [...currentPath];
        }
        return;
      }
      if (pathLen >= bestPathLen) return;
      for (const [dx, dy] of directions) {
        const nx = x + dx;
        const ny = y + dy;
        if (
          isValid(nx, ny) &&
          !visited[nx][ny] &&
          !this.board[nx][ny].withinBorder
        ) {
          visited[nx][ny] = true;
          currentPath.push([nx, ny]);
          const key: [number, number] = [nx, ny];
          if (nodesToCover.some((node) => node[0] === nx && node[1] === ny)) {
            backtrack(
              nx,
              ny,
              new Set(covered).add(key),
              pathLen + 1,
              currentPath
            );
          } else {
            backtrack(nx, ny, covered, pathLen + 1, currentPath);
          }
          currentPath.pop();
          visited[nx][ny] = false;
        }
      }
    };

    visited[start[0]][start[1]] = true;
    backtrack(start[0], start[1], new Set(), 0, [start]);

    if (bestPathLen !== Infinity) {
      return [bestPathLen, bestPathNodes];
    } else {
      return [null, []];
    }
  }
}


// ... rest of the Graph class and the functions remain mostly unchanged ...

function createBoard(width: number, height: number): Node[][] {
  const board: Node[][] = Array.from({ length: width }, (_, i) => 
    Array.from({ length: height }, (_, j) => new Node(i, j))
  );
  return board;
}

function linkNodes(board: Node[][]): Edge[] {
  const edges: Edge[] = [];
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (j < board[i].length - 1) {
        edges.push(new Edge(board[i][j], board[i][j + 1]));
      }
      if (i < board.length - 1) {
        edges.push(new Edge(board[i][j], board[i + 1][j]));
      }
    }
  }
  return edges;
}


function main() {
  // width, height
  const board = createBoard(4, 4);
  const edges = linkNodes(board);

  for (const edge of edges) {
    edge.linkCells();
  }

  console.log("FIRST GO!");
  const graph = new Graph(board, edges);
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[0].length; j++) {
      console.log(board[i][j].print());
    }
  }

  graph.createAisles(board[1][1], board[1][2]);

  console.log("SECOND GO!");
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[0].length; j++) {
      console.log(board[i][j].print());
    }
  }

  const matrix = Array(4)
    .fill(null)
    .map(() => Array(4).fill(0)); // Properly initialize the matrix
  const nodesToCover: [number, number][] = [
    [0, 0],
    [3, 0],
    [0, 1],
    [0, 2],
    [2, 1],
  ];
  const [distance, path] = graph.shortestPath(matrix, nodesToCover);
  console.log("Distance", distance);
  console.log("Path", path);

  // console.log("Result: ", result);

  // console.log(edges.length);
  // for (const edge of edges) {
  //   const NodeFromPrint = edge.NodeFrom.print();
  //   const NodeToPrint = edge.NodeTo.print();
  //   console.log(NodeFromPrint, "-", NodeToPrint);
  // }

  // width, height
  // width, height
  const board1 = createBoard(10, 10);
  const edges1 = linkNodes(board1);

  for (const edge1 of edges1) {
    edge1.linkCells();
  }

  console.log("FIRST GO!");
  const graph1 = new Graph(board1, edges1);
  for (let i = 0; i < board1.length; i++) {
    for (let j = 0; j < board1[0].length; j++) {
      console.log(board1[i][j].print());
    }
  }

  graph1.createAisles(board1[2][6], board1[2][8]);
  graph1.createAisles(board1[5][1], board1[5][5]);
  graph1.createAisles(board1[8][6], board1[8][8]);

  console.log("SECOND GO!");
  for (let i = 0; i < board1.length; i++) {
    for (let j = 0; j < board1[0].length; j++) {
      console.log(board1[i][j].print());
    }
  }

  const matrix1 = Array(10)
    .fill(null)
    .map(() => Array(10).fill(0)); // Properly initialize the matrix
  const nodesToCover1: [number, number][] = [
    [0, 7],
    [2, 3],
    [5, 7],
    [7, 8],
    [8, 2],
  ];
  const [distance1, path1] = graph1.shortestPath(matrix1, nodesToCover1);
  console.log("Distance", distance1);
  console.log("Path", path1);
}

main();

export { Graph, createBoard, linkNodes };

// ... rest of the code ...





// class Node {
//   x: number;
//   y: number;
//   withinBorder: Boolean;
//   north: Node;
//   south: Node;
//   east: Node;
//   west: Node;

//   constructor(x: number, y: number) {
//     this.x = x;
//     this.y = y;
//     this.withinBorder = false;
//   }

//   print() {
//     const neighbors = this.getNeighbors();
//     let string = "Postion: (" + this.x + "," + this.y + ")" + " Neighbors :";
//     for (const neighbor of neighbors) {
//       string += "(" + neighbor.x + "," + neighbor.y + ")";
//     }
//     return string;
//   }

//   getNeighbors() {
//     const NodeList: Node[] = [];
//     if (this.north) {
//       NodeList.push(this.north);
//     }

//     if (this.south) {
//       NodeList.push(this.south);
//     }
//     if (this.west) {
//       NodeList.push(this.west);
//     }

//     if (this.east) {
//       NodeList.push(this.east);
//     }

//     return NodeList;
//   }
// }

// class Edge {
//   NodeTo: Node;
//   NodeFrom: Node;
//   // distance:

//   constructor(NodeTo: Node, NodeFrom: Node) {
//     this.NodeTo = NodeTo;
//     this.NodeFrom = NodeFrom;
//   }

//   linkCells() {
//     if (this.NodeFrom.x === this.NodeTo.x) {
//       if (this.NodeFrom.y > this.NodeTo.y) {
//         this.NodeTo.south = this.NodeFrom;
//         this.NodeFrom.north = this.NodeTo;
//       } else {
//         this.NodeTo.north = this.NodeFrom;
//         this.NodeFrom.south = this.NodeTo;
//       }
//     } else {
//       if (this.NodeFrom.x > this.NodeTo.x) {
//         this.NodeTo.east = this.NodeFrom;
//         this.NodeFrom.west = this.NodeTo;
//       } else {
//         this.NodeTo.west = this.NodeFrom;
//         this.NodeFrom.east = this.NodeTo;
//       }
//     }
//   }
// }

// class Graph {
//   board: Node[][];
//   // list of edges
//   edges: Edge[];
//   // Translate a Aisle Name to A Node in a Graph
//   itemTranslation: Map<string, Node>;
//   visited: boolean[][];
//   pathFound: boolean;

//   constructor(board: Node[][], edges: Edge[]) {
//     this.board = board;
//     this.edges = edges;
//     this.visited = new Array(board.length);
//     this.itemTranslation = new Map();

//     for (let i = 0; i < board.length; i++) {
//       this.visited[i] = new Array(board[0].length);
//       for (let j = 0; j < board[0].length; j++) {
//         this.visited[i][j] = false;
//       }
//     }
//   }

//   // adds an item on our Map to represent a Node
//   createTransalation(aisleName: string, node: Node) {
//     this.itemTranslation.set(aisleName, node);
//   }

//   createAisles(upperLeft: Node, lowerRight: Node) {
//     let leftX = upperLeft.x;
//     let rightX = lowerRight.x;

//     let northY = upperLeft.y;
//     let southY = lowerRight.y;

//     for (let i = leftX; i <= rightX; i++) {
//       for (let j = northY; j <= southY; j++) {
//         const currentNode = this.board[i][j];
//         currentNode.withinBorder = true;

//         // Removing the horizontal edges needed

//         if (i === leftX) {
//           //unhook the upperNode
//           const prevLeftNode = this.board[i - 1][j];
//           prevLeftNode.east = null;

//           currentNode.west = null;
//         }

//         if (i === rightX) {
//           //unhook the upperNode
//           const forwardRightNode = this.board[i + 1][j];
//           forwardRightNode.west = null;

//           currentNode.east = null;
//         }

//         if (j === southY) {
//           const prevBelowNode = this.board[i][j + 1];
//           prevBelowNode.north = null;

//           currentNode.south = null;
//         }

//         if (j === northY) {
//           const forwardBelowNode = this.board[i][j - 1];
//           forwardBelowNode.south = null;

//           currentNode.north = null;
//         }
//       }
//     }
//   }

//   // List of Nodes Return Type
//   dfs(
//     currentPosX: number,
//     currentPosY: number,
//     endingPosX: number,
//     endingPosY: number,
//     path: Node[]
//   ) {
//     if (currentPosX === endingPosX && currentPosY === endingPosY) {
//       this.pathFound = true;
//       return path;
//     }

//     if (
//       currentPosX < 0 ||
//       currentPosX >= this.board.length ||
//       currentPosY < 0 ||
//       currentPosY >= this.board[0].length ||
//       this.visited[currentPosX][currentPosY]
//     ) {
//       return;
//     }

//     this.visited[currentPosX][currentPosY] = true;

//     const currentNode = this.board[currentPosX][currentPosY];
//     // here we add the logic for if we can go left, right, up, or bottom
//     const outNeighbors = currentNode.getNeighbors();
//     for (const node of outNeighbors) {
//       const newPath = [...path];
//       newPath.push(node);

//       // Recursive call with the new path
//       const result = this.dfs(node.x, node.y, endingPosX, endingPosY, newPath);

//       if (result) {
//         // If the path is found in the recursive call, return it
//         return result;
//       }
//     }
//   }

//   shortestPath(matrix: number[][], nodesToCover: [number, number][]) {
//     const m = matrix.length;
//     const n = matrix[0].length;
//     const start: [number, number] = [m - 1, n - 1];
//     const end: [number, number] = [0, n - 1];
//     const visited = Array.from({ length: m }, () => Array(n).fill(false));
//     const directions: [number, number][] = [
//       [0, 1],
//       [1, 0],
//       [0, -1],
//       [-1, 0],
//     ];
//     let bestPathLen = Infinity;
//     let bestPathNodes: number[][] = [];

//     const isValid = (x: number, y: number) =>
//       0 <= x && x < m && 0 <= y && y < n;

//     const backtrack = (
//       x: number,
//       y: number,
//       covered: Set<[number, number]>,
//       pathLen: number,
//       currentPath: number[][]
//     ) => {
//       if (
//         x === end[0] &&
//         y === end[1] &&
//         covered.size === nodesToCover.length
//       ) {
//         if (pathLen < bestPathLen) {
//           bestPathLen = pathLen;
//           bestPathNodes = [...currentPath];
//         }
//         return;
//       }
//       if (pathLen >= bestPathLen) return;
//       for (const [dx, dy] of directions) {
//         const nx = x + dx;
//         const ny = y + dy;
//         if (
//           isValid(nx, ny) &&
//           !visited[nx][ny] &&
//           !this.board[nx][ny].withinBorder
//         ) {
//           visited[nx][ny] = true;
//           currentPath.push([nx, ny]);
//           const key: [number, number] = [nx, ny];
//           if (nodesToCover.some((node) => node[0] === nx && node[1] === ny)) {
//             backtrack(
//               nx,
//               ny,
//               new Set(covered).add(key),
//               pathLen + 1,
//               currentPath
//             );
//           } else {
//             backtrack(nx, ny, covered, pathLen + 1, currentPath);
//           }
//           currentPath.pop();
//           visited[nx][ny] = false;
//         }
//       }
//     };

//     visited[start[0]][start[1]] = true;
//     backtrack(start[0], start[1], new Set(), 0, [start]);

//     if (bestPathLen !== Infinity) {
//       return [bestPathLen, bestPathNodes];
//     } else {
//       return [null, []];
//     }
//   }
// }

// // eventually add in functionality to add in an item for an aisl

// function createBoard(width: number, height: number) {
//   let board = [];
//   //create the 2D Grid
//   for (let i = 0; i < width; i++) {
//     board[i] = [];
//   }

//   //Populate the Grid with Nodes at each index
//   for (let i = 0; i < width; i++) {
//     for (let j = 0; j < height; j++) {
//       board[i][j] = new Node(i, j);
//     }
//   }

//   return board;
// }

// function linkNodes(board: Node[][]) {
//   const height = board[0].length;
//   const width = board.length;
//   console.log("width: ", width);
//   console.log("height: ", height);
//   const edges: Edge[] = [];

//   // this is for the columns
//   for (let i = 0; i < width; i++) {
//     for (let j = 0; j < height - 1; j++) {
//       const currentCell = board[i][j];
//       const nextCell = board[i][j + 1];

//       const edge = new Edge(currentCell, nextCell);
//       edges.push(edge);
//     }
//   }

//   // this is for the rows
//   for (let j = 0; j < height; j++) {
//     for (let i = 0; i < width - 1; i++) {
//       const currentCell = board[i][j];
//       const nextCell = board[i + 1][j];

//       const edge = new Edge(currentCell, nextCell);
//       edges.push(edge);
//     }
//   }

//   return edges;
// }

// function drawGraph(graph: Graph): void {
//   const mazeContainer = document.getElementById("maze-container");

//   for (let i = 0; i < graph.board.length; i++) {
//     const mazeRow = document.createElement("div");

//     for (let j = 0; j < graph.board[i].length; j++) {
//       const mazeBox = document.createElement("div");
//       mazeBox.style.width = "20px";
//       mazeBox.style.height = "20px";
//       mazeBox.style.border = "1px solid black";
//       mazeBox.style.backgroundColor = "white";
//       mazeRow.appendChild(mazeBox);
//     }

//     mazeContainer.appendChild(mazeRow);
//   }
// }

// function main() {
//   // width, height
//   const board = createBoard(4, 4);
//   const edges = linkNodes(board);

//   for (const edge of edges) {
//     edge.linkCells();
//   }

//   console.log("FIRST GO!");
//   const graph = new Graph(board, edges);
//   for (let i = 0; i < board.length; i++) {
//     for (let j = 0; j < board[0].length; j++) {
//       console.log(board[i][j].print());
//     }
//   }

//   graph.createAisles(board[1][1], board[1][2]);

//   console.log("SECOND GO!");
//   for (let i = 0; i < board.length; i++) {
//     for (let j = 0; j < board[0].length; j++) {
//       console.log(board[i][j].print());
//     }
//   }

//   const matrix = Array(4)
//     .fill(null)
//     .map(() => Array(4).fill(0)); // Properly initialize the matrix
//   const nodesToCover: [number, number][] = [
//     [0, 0],
//     [3, 0],
//     [0, 1],
//     [0, 2],
//     [2, 1],
//   ];
//   const [distance, path] = graph.shortestPath(matrix, nodesToCover);
//   console.log("Distance", distance);
//   console.log("Path", path);

//   // console.log("Result: ", result);

//   // console.log(edges.length);
//   // for (const edge of edges) {
//   //   const NodeFromPrint = edge.NodeFrom.print();
//   //   const NodeToPrint = edge.NodeTo.print();
//   //   console.log(NodeFromPrint, "-", NodeToPrint);
//   // }

//   // width, height
//   // width, height
//   const board1 = createBoard(10, 10);
//   const edges1 = linkNodes(board1);

//   for (const edge1 of edges1) {
//     edge1.linkCells();
//   }

//   console.log("FIRST GO!");
//   const graph1 = new Graph(board1, edges1);
//   for (let i = 0; i < board1.length; i++) {
//     for (let j = 0; j < board1[0].length; j++) {
//       console.log(board1[i][j].print());
//     }
//   }

//   graph1.createAisles(board1[2][6], board1[2][8]);
//   graph1.createAisles(board1[5][1], board1[5][5]);
//   graph1.createAisles(board1[8][6], board1[8][8]);

//   console.log("SECOND GO!");
//   for (let i = 0; i < board1.length; i++) {
//     for (let j = 0; j < board1[0].length; j++) {
//       console.log(board1[i][j].print());
//     }
//   }

//   const matrix1 = Array(10)
//     .fill(null)
//     .map(() => Array(10).fill(0)); // Properly initialize the matrix
//   const nodesToCover1: [number, number][] = [
//     [0, 7],
//     [2, 3],
//     [5, 7],
//     [7, 8],
//     [8, 2],
//   ];
//   const [distance1, path1] = graph1.shortestPath(matrix1, nodesToCover1);
//   console.log("Distance", distance1);
//   console.log("Path", path1);
// }

// main();

// export { Graph, createBoard, linkNodes };
