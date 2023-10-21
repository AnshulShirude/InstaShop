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
    }
    createAisles(upperRight, upperLeft, lowerRight, lowerLeft) {
        for (let i = upperLeft; i < upperRight; i++) {
            for (let j = lowerLeft; j < lowerRight; j++) {
                const currentNode = this.board[i][j];
                const neighbors = currentNode.getNeighbors();
                for (const edge of this.edges) {
                    for (const Node of neighbors) {
                        if (edge.containsNodes(currentNode, Node)) {
                            this.edges.filter((totalEdges) => totalEdges !== edge);
                        }
                    }
                }
            }
        }
    }
}
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
//# sourceMappingURL=graph.js.map