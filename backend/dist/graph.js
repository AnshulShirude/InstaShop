class Node {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    print() {
        return "X Coordinate:" + this.x + " Y Coordinate: " + this.y;
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
    containsNodes(node1, node2) {
        const first = this.NodeFrom === node1 || this.NodeTo === node1;
        const second = this.NodeFrom === node2 || this.NodeTo === node2;
        return first && second;
    }
}
class Graph {
    constructor(board, edges) {
        this.board = board;
        this.edges = edges;
        this.visited = new Boolean[board.length][board[0].length]();
        for (let i = 0; i < board.length; i++) {
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
        for (let i = leftX; i < rightX; i++) {
            for (let j = northY; j < southY; j++) {
                const currentNode = this.board[i][j];
                // Removing the horizontal edges needed
                if (i === leftX) {
                    currentNode.east = null;
                }
                else if (i === rightX) {
                    currentNode.west = null;
                }
                else {
                    currentNode.east = null;
                    currentNode.west = null;
                }
                // Removing the vertical edges needed
                if (j === northY) {
                    currentNode.south = null;
                }
                else if (j === southY) {
                    currentNode.north = null;
                }
                else {
                    currentNode.north = null;
                    currentNode.south = null;
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
function main() {
    // width, height
    const board = createBoard(3, 3);
    const edges = linkNodes(board);
    for (const edge of edges) {
        edge.linkCells();
    }
    const graph = new Graph(board, edges);
    const result = graph.dfs(0, 0, 2, 2, []);
    console.log("Result: ", result);
    console.log(edges.length);
    for (const edge of edges) {
        const NodeFromPrint = edge.NodeFrom.print();
        const NodeToPrint = edge.NodeTo.print();
        console.log(NodeFromPrint, "-", NodeToPrint);
    }
}
main();
export { Graph, createBoard, linkNodes };
//# sourceMappingURL=graph.js.map