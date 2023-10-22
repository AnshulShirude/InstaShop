class Node {
    constructor(x, y) {
        this.north = undefined;
        this.south = undefined;
        this.east = undefined;
        this.west = undefined;
        this.withinBorder = false;
        this.visited = false;
        this.x = x;
        this.y = y;
    }
    equals(node) {
        return this.x === node.x && this.y === node.y;
    }
    resetVisited() {
        this.visited = false;
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
        this.itemTranslation = new Map();
    }
    getNode(x, y) {
        return this.board[x][y];
    }
    getNeighbors(node) {
        const moves = [];
        if (node.west) {
            moves.push([-1, 0]);
        }
        if (node.east) {
            moves.push([1, 0]);
        }
        if (node.north) {
            moves.push([0, -1]);
        }
        if (node.south) {
            moves.push([0, 1]);
        }
        const neighbors = [];
        for (const [dx, dy] of moves) {
            const nx = node.x + dx;
            const ny = node.y + dy;
            if (nx >= 0 && nx < this.board.length && ny >= 0 && ny < this.board[0].length) {
                neighbors.push(this.board[nx][ny]);
            }
        }
        return neighbors;
    }
    // adds an item on our Map to represent a Node
    createTransalation(aisleName, node) {
        this.itemTranslation.set(aisleName, node);
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
                if (i === leftX) {
                    if (i >= 1) {
                        const prevLeftNode = this.board[i - 1][j];
                        prevLeftNode.east = null;
                        currentNode.west = null;
                    }
                }
                if (i === rightX) {
                    if (i < this.board.length - 2) {
                        const forwardRightNode = this.board[i + 1][j];
                        forwardRightNode.west = null;
                        currentNode.east = null;
                    }
                }
                if (j === southY) {
                    if (j < this.board[0].length - 2) {
                        const prevBelowNode = this.board[i][j + 1];
                        prevBelowNode.north = null;
                        currentNode.south = null;
                    }
                }
                if (j === northY) {
                    if (j >= 1) {
                        const forwardBelowNode = this.board[i][j - 1];
                        forwardBelowNode.south = null;
                        currentNode.north = null;
                    }
                }
            }
        }
    }
    bfs(start, end) {
        const queue = [[start, [start]]];
        start.visited = true;
        while (queue.length > 0) {
            const [current, path] = queue.shift();
            if (current.equals(end)) {
                this.resetAllVisited();
                return path;
            }
            for (const neighbor of this.getNeighbors(current)) {
                if (!neighbor.visited && !neighbor.withinBorder) {
                    neighbor.visited = true;
                    queue.push([neighbor, [...path, neighbor]]);
                }
            }
        }
        this.resetAllVisited();
        return [];
    }
    resetAllVisited() {
        this.board.forEach(row => row.forEach(cell => cell.resetVisited()));
    }
    shortestPathBFS(start, end, nodesToCover) {
        let bestPathLen = Infinity;
        let bestPath = [];
        const backtrack = (remainingNodes, currentPath) => {
            if (remainingNodes.length === 0) {
                this.resetAllVisited();
                const newPath = this.bfs(currentPath[currentPath.length - 1], end);
                if (newPath.length < bestPathLen) {
                    bestPath = [...currentPath, ...newPath];
                    bestPathLen = bestPath.length;
                }
                return;
            }
            for (const node of remainingNodes) {
                this.resetAllVisited();
                for (const pathNode of currentPath) {
                    this.getNode(pathNode.x, pathNode.y).visited = true;
                }
                if (currentPath[currentPath.length - 1].equals(start) && node.equals(start)) {
                    continue;
                }
                const path = this.bfs(currentPath[currentPath.length - 1], node);
                if (path.length > 0) {
                    backtrack(remainingNodes.filter(n => !n.equals(node)), [...currentPath, ...path.slice(1)]);
                }
            }
        };
        backtrack(nodesToCover, [start]);
        return bestPath;
    }
}
function createBoard(width, height) {
    let board = [];
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
const board1 = createBoard(10, 10);
const edges1 = linkNodes(board1);
for (const edge1 of edges1) {
    edge1.linkCells();
}
const graph1 = new Graph(board1, edges1);
graph1.createAisles(board1[2][6], board1[2][8]);
graph1.createAisles(board1[5][1], board1[5][5]);
graph1.createAisles(board1[8][6], board1[8][8]);
const startNode = graph1.getNode(9, 9);
const endNode = graph1.getNode(0, 9);
const nodesToCover = [graph1.getNode(0, 7), graph1.getNode(2, 3), graph1.getNode(5, 7), graph1.getNode(7, 8), graph1.getNode(8, 2)];
const path = graph1.shortestPathBFS(startNode, endNode, nodesToCover);
console.log(`Shortest path length: ${path.length}`);
const pathCoords = new Set();
for (let node of path) {
    pathCoords.add([node.x, node.y]);
}
console.log('Path:', pathCoords);
export { Graph, createBoard, linkNodes };
//# sourceMappingURL=graph.js.map