import {Graph, createBoard, linkNodes} from "../GraphLogic/graph"

export default function GraphUI() {

    const board = createBoard(10, 10);
    console.log(board);
    const edges = linkNodes(board);
    for (const edge of edges) {
        edge.linkCells();
    }

    const graph = new Graph(board, edges);
    const graphData = [];

    graph.createAisles(graph.board[2][2], graph.board[2][5]);
    graph.createAisles(graph.board[4][2], graph.board[4][5]);
    graph.createAisles(graph.board[6][2], graph.board[6][5]);
    graph.createAisles(graph.board[9][4], graph.board[9][7]);
    console.log('This is the graph: ', graph);


    for (let j = 0; j < graph.board[0].length; j++) {

        const row = [];
        for (let i = 0; i < graph.board.length; i++) {

            const currNode = graph.board[i][j];
            const leftBorderColor = !currNode.withinBorder && currNode.west ? "white" : "black";
            const topBorderColor = !currNode.withinBorder && currNode.north ? "white" : "black";
            const bottomBorderColor = !currNode.withinBorder && currNode.south ? "white" : "black";
            const rightBorderColor = !currNode.withinBorder && currNode.east ? "white" : "black";

            const cellStyle = {
                width: '40px', 
                height: '40px', 
                backgroundColor: `${currNode.withinBorder ? "black" : "white"}`,
                borderLeft: `1px solid ${leftBorderColor}`,
                borderRight: `1px solid ${rightBorderColor}`,
                borderTop: `1px solid ${topBorderColor}`,
                borderBottom: `1px solid ${bottomBorderColor}`,
            };

            row.push(
                <div key={`${i}-${j}`} className="cell" style={cellStyle}>
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