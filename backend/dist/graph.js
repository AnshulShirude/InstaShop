class Node {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.north = undefined;
        this.east = undefined;
        this.west = undefined;
        this.south = undefined;
    }
    print() {
        const neighbors = this.getNeighbors();
        let string = "Postion: (" + this.x + "," + this.y + ")" + " Neighbors :";
        for (const neighbor of neighbors) {
            string += "(" + neighbor.x + "," + neighbor.y + ")";
        }
        return string;
    }
    getNeighbors() {
        const NodeList = [];
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
    // distance:
    constructor(NodeTo, NodeFrom) {
        this.NodeTo = NodeTo;
        this.NodeFrom = NodeFrom;
    }
    linkCells() {
        if (this.NodeFrom.x === this.NodeTo.x) {
            if (this.NodeFrom.y > this.NodeTo.y) {
                this.NodeTo.south = this.NodeFrom;
                this.NodeFrom.north = this.NodeTo;
            }
            else {
                this.NodeTo.north = this.NodeFrom;
                this.NodeFrom.south = this.NodeTo;
            }
        }
        else {
            if (this.NodeFrom.x > this.NodeTo.x) {
                this.NodeTo.east = this.NodeFrom;
                this.NodeFrom.west = this.NodeTo;
            }
            else {
                this.NodeTo.west = this.NodeFrom;
                this.NodeFrom.east = this.NodeTo;
            }
        }
    }
}
class Graph {
    constructor(board, edges) {
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
    createAisles(upperLeft, lowerRight) {
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
    dfs(currentPosX, currentPosY, endingPosX, endingPosY, path) {
        if (currentPosX === endingPosX && currentPosY === endingPosY) {
            this.pathFound = true;
            return path;
        }
        if (currentPosX < 0 ||
            currentPosX >= this.board.length ||
            currentPosY < 0 ||
            currentPosY >= this.board[0].length ||
            this.visited[currentPosX][currentPosY]) {
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
    shortestPath(matrix, nodesToCover) {
        const m = matrix.length;
        const n = matrix[0].length;
        const start = [m - 1, n - 1];
        const end = [0, n - 1];
        const visited = Array.from({ length: m }, () => Array(n).fill(false));
        const directions = [
            [0, 1],
            [1, 0],
            [0, -1],
            [-1, 0],
        ];
        let bestPathLen = Infinity;
        let bestPathNodes = [];
        const isValid = (x, y) => 0 <= x && x < m && 0 <= y && y < n;
        const backtrack = (x, y, covered, pathLen, currentPath) => {
            if (x === end[0] &&
                y === end[1] &&
                covered.size === nodesToCover.length) {
                if (pathLen < bestPathLen) {
                    bestPathLen = pathLen;
                    bestPathNodes = [...currentPath];
                }
                return;
            }
            if (pathLen >= bestPathLen)
                return;
            for (const [dx, dy] of directions) {
                const nx = x + dx;
                const ny = y + dy;
                if (isValid(nx, ny) && !visited[nx][ny] && !this.board[nx][ny].withinBorder) {
                    visited[nx][ny] = true;
                    currentPath.push([nx, ny]);
                    const key = [nx, ny];
                    if (nodesToCover.some((node) => node[0] === nx && node[1] === ny)) {
                        backtrack(nx, ny, new Set(covered).add(key), pathLen + 1, currentPath);
                    }
                    else {
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
        }
        else {
            return [null, []];
        }
    }
}
// eventually add in functionality to add in an item for an aisl
function createBoard(width, height) {
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
function linkNodes(board) {
    const height = board[0].length;
    const width = board.length;
    console.log("width: ", width);
    console.log("height: ", height);
    const edges = [];
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
function drawGraph(graph) {
    const mazeContainer = document.getElementById("maze-container");
    for (let i = 0; i < graph.board.length; i++) {
        const mazeRow = document.createElement("div");
        for (let j = 0; j < graph.board[i].length; j++) {
            const mazeBox = document.createElement("div");
            mazeBox.style.width = "20px";
            mazeBox.style.height = "20px";
            mazeBox.style.border = "1px solid black";
            mazeBox.style.backgroundColor = "white";
            mazeRow.appendChild(mazeBox);
        }
        mazeContainer.appendChild(mazeRow);
    }
}
function drawGraph(graph) {
    const mazeContainer = document.getElementById("maze-container");
    for (let i = 0; i < graph.board.length; i++) {
        const mazeRow = document.createElement("div");
        for (let j = 0; j < graph.board[i].length; j++) {
            const mazeBox = document.createElement("div");
            mazeBox.style.width = "20px";
            mazeBox.style.height = "20px";
            mazeBox.style.border = "1px solid black";
            mazeBox.style.backgroundColor = "white";
            mazeRow.appendChild(mazeBox);
        }
        mazeContainer.appendChild(mazeRow);
    }
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
    const nodesToCover = [
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
}
main();
export { Graph, createBoard, linkNodes };
//# sourceMappingURL=graph.js.map