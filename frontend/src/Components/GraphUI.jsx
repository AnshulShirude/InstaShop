import {Graph, Node, Edge, linkNodes, createBoard} from "../GraphLogic/graph"

export default function GraphUI() {

    const board = createBoard(5, 6);
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
        width: '80px', 
        height: '80px', 
        
    };

    for (let j = 0; j < graph.board[0].length; j++) {

        const row = [];
        for (let i = 0; i < graph.board.length; i++) {

            const currNode = graph.board[i][j];
            const leftBorder = currNode.west ? "none" : "solid";
            const topBorder = currNode.north ? "none" : "solid";
            const bottomBorder = currNode.south ? "none" : "solid";
            const rightBorder = currNode.east ? "none" : "solid";

            const borders = {
                borderLeft: leftBorder,
                borderTop: topBorder,
                borderBottom: bottomBorder,
                borderRight: rightBorder,
            };

            row.push(
                <div key={`${i}-${j}`} className="cell" style={{...cellStyle, ...borders}}>
                    Cell ({i}, {j})
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