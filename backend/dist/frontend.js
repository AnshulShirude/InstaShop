import { Graph, linkNodes, createBoard } from "./graph.js";
const testBoard = createBoard(4, 4);
const edges = linkNodes(testBoard);
const graph = new Graph(testBoard, edges);
function drawGraph(graph) { }
//# sourceMappingURL=frontend.js.map