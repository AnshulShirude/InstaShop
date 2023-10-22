import { Graph, createBoard, linkNodes } from "../GraphLogic/graph";

export default function MasterGraph() {
  const board = createBoard(80, 20);
  console.log(board);
  const edges = linkNodes(board);
  for (const edge of edges) {
    edge.linkCells();
  }

  const graph = new Graph(board, edges);
  const graphData = [];

  //Outer Borders:
  // horiz
  graph.createAisles(graph.board[0][0], graph.board[20][0]);
  graph.createAisles(graph.board[0][19], graph.board[20][19]);

  // vert left
  graph.createAisles(graph.board[0][16], graph.board[0][17]);

  // C section:
  graph.createAisles(graph.board[2][2], graph.board[16][3]);

  graph.createAisles(graph.board[2][5], graph.board[8][6]);
  graph.createAisles(graph.board[12][5], graph.board[16][6]);

  graph.createAisles(graph.board[2][9], graph.board[16][10]);

  graph.createAisles(graph.board[2][12], graph.board[16][13]);

  // B section
  graph.createAisles(graph.board[22][2], graph.board[24][7]);
  graph.createAisles(graph.board[26][2], graph.board[28][7]);
  graph.createAisles(graph.board[30][2], graph.board[32][7]);
  graph.createAisles(graph.board[34][3], graph.board[35][7]);
  graph.createAisles(graph.board[37][3], graph.board[38][7]);
  graph.createAisles(graph.board[41][2], graph.board[42][6]);
  graph.createAisles(graph.board[45][2], graph.board[46][6]);
  graph.createAisles(graph.board[49][2], graph.board[50][6]);

  graph.createAisles(graph.board[27][0], graph.board[50][0]);

  graph.createAisles(graph.board[22][11], graph.board[24][18]);
  graph.createAisles(graph.board[26][11], graph.board[28][18]);
  graph.createAisles(graph.board[30][11], graph.board[32][18]);
  graph.createAisles(graph.board[35][11], graph.board[35][14]);
  graph.createAisles(graph.board[35][16], graph.board[35][18]);

  graph.createAisles(graph.board[38][13], graph.board[39][18]);
  graph.createAisles(graph.board[42][13], graph.board[43][18]);
  graph.createAisles(graph.board[46][12], graph.board[47][18]);
  graph.createAisles(graph.board[50][12], graph.board[51][18]);

  // A Section
  graph.createAisles(graph.board[56][2], graph.board[57][7]);
  graph.createAisles(graph.board[59][2], graph.board[60][7]);
  graph.createAisles(graph.board[63][2], graph.board[64][7]);
  graph.createAisles(graph.board[64][7], graph.board[70][7]);

  graph.createAisles(graph.board[68][4], graph.board[77][5]);
  graph.createAisles(graph.board[65][0], graph.board[74][0]);

  graph.createAisles(graph.board[76][0], graph.board[76][2]);

  // D Section (second half)
  graph.createAisles(graph.board[54][11], graph.board[56][17]);
  graph.createAisles(graph.board[58][11], graph.board[60][17]);
  graph.createAisles(graph.board[62][11], graph.board[64][17]);
  graph.createAisles(graph.board[66][11], graph.board[68][17]);

  graph.createAisles(graph.board[70][12], graph.board[72][17]);

  // initilaze the translation Map
  graph.itemTranslation.set("A6", graph.board[55][6]);
  graph.itemTranslation.set("A5", graph.board[58][4]);
  graph.itemTranslation.set("A4", graph.board[58][2]);
  graph.itemTranslation.set("A3", graph.board[61][6]);
  graph.itemTranslation.set("A2", graph.board[62][5]);

  graph.itemTranslation.set("B16", graph.board[21][7]);
  graph.itemTranslation.set("B15", graph.board[25][4]);
  graph.itemTranslation.set("B14", graph.board[25][2]);
  graph.itemTranslation.set("B13", graph.board[29][6]);
  graph.itemTranslation.set("B12", graph.board[29][5]);
  graph.itemTranslation.set("B11", graph.board[33][4]);
  graph.itemTranslation.set("B10", graph.board[33][6]);
  graph.itemTranslation.set("B9", graph.board[36][7]);
  graph.itemTranslation.set("B8", graph.board[36][3]);
  graph.itemTranslation.set("B7", graph.board[39][3]);
  graph.itemTranslation.set("B6", graph.board[40][4]);
  graph.itemTranslation.set("B5", graph.board[43][5]);
  graph.itemTranslation.set("B4", graph.board[44][6]);
  graph.itemTranslation.set("B3", graph.board[47][7]);
  graph.itemTranslation.set("B2", graph.board[48][6]);
  graph.itemTranslation.set("B1", graph.board[51][2]);

  graph.itemTranslation.set("C12", graph.board[1][17]);
  graph.itemTranslation.set("C11", graph.board[17][1]);
  graph.itemTranslation.set("C10", graph.board[6][1]);
  graph.itemTranslation.set("C9", graph.board[16][4]);
  graph.itemTranslation.set("C8", graph.board[7][4]);
  graph.itemTranslation.set("C7", graph.board[4][7]);
  graph.itemTranslation.set("C6", graph.board[16][4]);
  graph.itemTranslation.set("C5", graph.board[16][7]);
  graph.itemTranslation.set("C4", graph.board[6][8]);
  graph.itemTranslation.set("C3", graph.board[12][11]);
  graph.itemTranslation.set("C2", graph.board[6][11]);
  graph.itemTranslation.set("C1", graph.board[8][14]);

  graph.itemTranslation.set("D30", graph.board[21][16]);
  graph.itemTranslation.set("D29", graph.board[25][14]);
  graph.itemTranslation.set("D28", graph.board[25][12]);
  graph.itemTranslation.set("D27", graph.board[29][18]);
  graph.itemTranslation.set("D26", graph.board[29][13]);
  graph.itemTranslation.set("D25", graph.board[33][16]);
  graph.itemTranslation.set("D24", graph.board[36][17]);
  graph.itemTranslation.set("D23", graph.board[37][14]);
  graph.itemTranslation.set("D22", graph.board[40][16]);
  graph.itemTranslation.set("D21", graph.board[41][14]);
  graph.itemTranslation.set("D20", graph.board[44][15]);
  graph.itemTranslation.set("D19", graph.board[45][14]);
  graph.itemTranslation.set("D18", graph.board[48][16]);
  graph.itemTranslation.set("D17", graph.board[49][18]);
  graph.itemTranslation.set("D16", graph.board[52][16]);
  graph.itemTranslation.set("D15", graph.board[53][15]);
  graph.itemTranslation.set("D14", graph.board[57][16]);
  graph.itemTranslation.set("D13", graph.board[57][15]);
  graph.itemTranslation.set("D12", graph.board[61][17]);
  graph.itemTranslation.set("D11", graph.board[61][17]);
  graph.itemTranslation.set("D10", graph.board[65][18]);
  graph.itemTranslation.set("D9", graph.board[65][17]);
  graph.itemTranslation.set("D8", graph.board[69][14]);
  graph.itemTranslation.set("D7", graph.board[69][16]);
  graph.itemTranslation.set("D6", graph.board[73][15]);


  //////////////////////////////////////////////////////////////
  
  const startNode = graph.getNode(79, 9);
  const endNode = graph.getNode(73, 2);

  // const nodesToCover = Array.from(graph.itemTranslation.values());
  const nodesToCover = [graph.getNode(25, 4), graph.getNode(8, 14), graph.getNode(36 ,17), graph.getNode(69, 16)];
  
  const path = graph.shortestPathBFS(startNode, endNode, nodesToCover);
  console.log(`Shortest path length: ${path.length}`);
  const pathCoords = [];
  for (let node of path) {
    pathCoords.push([node.x, node.y])
  }
  console.log('Path:', pathCoords);

  const finalPath = new Set();
  for (let item of path) {
    finalPath.add(graph.getNode(item.x, item.y));
  }
  console.log('This is the final path: ', finalPath);
  //////////////////////////////////////////////////////////////

  for (let j = 0; j < graph.board[0].length; j++) {
    const row = [];
    for (let i = 0; i < graph.board.length; i++) {
      const currNode = graph.board[i][j];
      const leftBorderColor =
        !currNode.withinBorder && currNode.west ? "white" : "grey";
      const topBorderColor =
        !currNode.withinBorder && currNode.north ? "white" : "grey";
      const bottomBorderColor =
        !currNode.withinBorder && currNode.south ? "white" : "grey";
      const rightBorderColor =
        !currNode.withinBorder && currNode.east ? "white" : "grey";

      function getByValue(searchValue) {
        for (let [key, value] of graph.itemTranslation.entries()) {
          if (value === searchValue) return key;
        }
      }

      const item = getByValue(currNode);
      const istInTranslation = !!item;

      let pathColor = currNode.withinBorder ? "grey" : "white";
      if (pathColor === "white") {
        pathColor = finalPath.has(currNode) ? "green" : "white"
      }
      if (pathColor === "green") {
        pathColor = nodesToCover.includes(currNode) ? "red" : "green"
      }

      const cellStyle = {
        width: "18px",
        height: "30px",
        // backgroundColor: `${currNode.withinBorder ? "grey" : "white"}`,
        backgroundColor: pathColor,
        borderLeft: `1px solid ${leftBorderColor}`,
        borderRight: `1px solid ${rightBorderColor}`,
        borderTop: `1px solid ${topBorderColor}`,
        borderBottom: `1px solid ${bottomBorderColor}`,
      };

      row.push(
        <div key={`${i}-${j}`} className="cell" style={cellStyle}>
        {/* {i} */}
          {/* {!currNode.withinBorder && (istInTranslation ? "x" : "o")} */}
        </div>
      );
    }
    graphData.push(row);
  }

  // assuming that the graph is populated with Nodes (x/y coordinates)

  return (
    <div className="graph-container">
      {graphData.map((row, rowIndex) => (
        <div key={rowIndex} className="row" style={{ display: "flex" }}>
          {row}
        </div>
      ))}
    </div>
  );
}
