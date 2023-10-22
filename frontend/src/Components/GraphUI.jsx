import {Graph, Node, Edge, linkNodes, createBoard} from "../GraphLogic/graph"

export default function GraphUI() {

    const board = createBoard(20, 20);
    console.log(board);
    const edges = linkNodes(board);
    for (const edge of edges) {
        edge.linkCells();
    }

    const graph = new Graph(board, edges);
    const graphData = [];

    graph.board[0][0].east = null;
    graph.board[0][1].west = null;

    const cellStyle = {
        width: '40px', 
        height: '40px',         
    };

    for (let j = 0; j < graph.board[0].length; j++) {

        const row = [];
        for (let i = 0; i < graph.board.length; i++) {

            const currNode = graph.board[i][j];
            const leftBorderColor = currNode.west ? "white" : "black";
            const topBorderColor = currNode.north ? "white" : "black";
            const bottomBorderColor = currNode.south ? "white" : "black";
            const rightBorderColor = currNode.east ? "white" : "black";

            const borders = {
                borderLeft: `1px solid ${leftBorderColor}`,
                borderRight: `1px solid ${rightBorderColor}`,
                borderTop: `1px solid ${topBorderColor}`,
                borderBottom: `1px solid ${bottomBorderColor}`,
            };

            row.push(
                <div key={`${i}-${j}`} className="cell" style={{...cellStyle, ...borders}}>
                    o
                </div>
            );
        }
        graphData.push(row);
    }

    return (
        <div className="graph-container">
            {graphData.map((row, rowIndex) => (
                <div key={rowIndex} className="row" style={{display: "flex"}}>
                    {row}
                </div>
            ))}
        </div>
    );
}