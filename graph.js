class Node {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.north = null;
        this.south = null;
        this.west = null;
        this.east = null;
    }
}

class Edge {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

class Graph {
    constructor(listOfNodes, listOfListOfEdges) {
        this.listOfNodes = listOfNodes;
        this.listOfListOfEdges = listOfListOfEdges;
    }
        
    print() {
        for (let i = 0; i < this.listOfNodes.length; i++) {
            console.log(`Node: (${this.listOfNodes[i].x}, ${this.listOfNodes[i].y})`);
            console.log("List of Edges:");
            for (let j = 0; j < this.listOfListOfEdges[i].length; j++) {
                console.log(`Edge: (${this.listOfListOfEdges[i][j].x}, ${this.listOfListOfEdges[i][j].y})`);
            }
            console.log("----------------------");
        }
    }
}


function main() {
    // Creating nodes for a 2x2 board
    const node1 = new Node(0, 0);
    const node2 = new Node(0, 1);
    const node3 = new Node(1, 0);
    const node4 = new Node(1, 1);

    // Creating edges
    const edge1 = new Edge(node1, node3); 
    const edge2 = new Edge(node1, node2); 
    const edge3 = new Edge(node2, node4);
    const edge4 = new Edge(node3, node4);

    // Creating a graph
    const listOfNodes = [node1, node2, node3, node4];
    const listOfListOfEdges = [
        [edge1, edge2],
        [edge2, edge3],
        [edge1, edge4],
        [edge3, edge4],
    ]; 
    const graph = new Graph(listOfNodes, listOfListOfEdges);

    // Printing the graph
    graph.print();
}

main();