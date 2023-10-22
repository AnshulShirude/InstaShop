// , Node, Edge
import { BsPlus, BsFillHouseDoorFill, BsInfoCircle, BsMap } from "react-icons/bs";
import {Node} from './graph.js'
export default function GraphUI() {
    const one = new Node(0, 0);
    const two = new Node(0, 1);
    const three = new Node(0, 2);
    const four = new Node(1, 0);
    const five = new Node(1, 1);
    const six = new Node(1, 2);
    const seven = new Node(2, 0);
    const eight = new Node(2, 1);
    const nine = new Node(2, 2);
    let array2D = [
        [one, two, three],
        [four, five, six],
        [seven, eight, nine]
    ];
    one.east = two;
    one.south = four;
    four.north = one;
    four.south = seven;
    seven.north = four;
    two.west = one;
    two.south = five;
    five.north = two;
    five.south = eight;
    eight.north = five;
    five.east = six;
    six.west = five;
    six.north = three;
    three.south = six;
    six.south = nine;
    nine.north = six;
    // let rows = 2 * array2D.length - 1;
    // let cols = 2 * array2D[0].length - 1;
    // let arr: (Node | boolean | string)[][] = Array(rows).fill(false).map(() => Array(cols).fill(false));
    // // Populate the new array with the nodes from array2D
    // for (let i = 0; i < array2D.length; i++) {
    //     for (let j = 0; j < array2D[i].length; j++) {
    //         arr[2 * i][2 * j] = array2D[i][j];
    //     }
    // }
    // // Traverse through the array2D
    // for (let i = 0; i < array2D.length; i++) {
    //     for (let j = 0; j < array2D[i].length; j++) {
    //         const currentNode = array2D[i][j];
    //         if (j + 1 < array2D[i].length && currentNode.east === array2D[i][j + 1]) {
    //             // Set the corresponding position in `arr` to true
    //             arr[2 * i][2 * j + 1] = true;
    //         }
    //         if (i + 1 < array2D.length && currentNode.south === array2D[i + 1][j]) {
    //             arr[2 * i + 1][2 * j] = true;
    //         }
    //         // Similarly, you can check for other directions and set the value in `arr` accordingly
    //     }
    // }
    // // Print to see the result
    // console.log(arr);
    // let rows = 2 * array2D.length - 1;
    // let cols = 2 * array2D[0].length - 1;
    // let arr = Array(rows).fill("N/A").map(() => Array(cols).fill("N/A"));
    // // Populate the new array with the nodes from array2D
    // for (let i = 0; i < array2D.length; i++) {
    //     for (let j = 0; j < array2D[i].length; j++) {
    //         arr[2 * i][2 * j] = (i * array2D[i].length + j + 1).toString();
    //         // For east connection
    //         if ((2 * j + 1) < cols) {
    //             arr[2 * i][2 * j + 1] = !!array2D[i][j].east;
    //         }
    //         // For south connection
    //         if ((2 * i + 1) < rows) {
    //             arr[2 * i + 1][2 * j] = !!array2D[i][j].south;
    //         }
    //     }
    // }
    // // Print to see the result
    // console.log(arr);
    // return arr;
    // //---------------------------------------------------------------------------
    //WORKING WITH N/A
    let rows = 2 * array2D.length - 1;
    let cols = 2 * array2D[0].length - 1;
    let arr = Array(rows).fill("N/A").map(() => Array(cols).fill("N/A"));

    for (let i = 0; i < array2D.length; i++) {
        for (let j = 0; j < array2D[i].length; j++) {
            arr[2 * i][2 * j] = [i, j]; // Storing the pair of x,y values
            if ((2 * j + 1) < cols) {
                arr[2 * i][2 * j + 1] = !!array2D[i][j].east;
            }
            if ((2 * i + 1) < rows) {
                arr[2 * i + 1][2 * j] = !!array2D[i][j].south;
            }
        }
    }
    //---------------------------------------------------------------------------
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (arr[i][j] === "N/A") {
                let eastValue = j + 1 < cols ? arr[i][j + 1] : false;
                let southValue = i + 1 < rows ? arr[i + 1][j] : false;
                
                let westValue = j - 1 >= 0 ? arr[i][j - 1] : false;
                let northValue = i - 1 >= 0 ? arr[i - 1][j] : false;
                
                if ((northValue && southValue) || (eastValue && westValue) || (northValue && southValue && eastValue && westValue)) {
                    arr[i][j] = true;
                } else {
                    arr[i][j] = false;
                }
            }
        }
    }



    console.log(arr);
    //RETURN TABLE WORKING ----------------------------------------------------------------------
    // return arr;
    // return (
    //     <table>
    //         <tbody>
    //             {arr.map((row, rowIndex) => (
    //                 <tr key={rowIndex}>
    //                     {row.map((cell, cellIndex) => (
    //                         <td key={cellIndex}>
    //                             {typeof cell === 'boolean' ? (cell ? 'True' : 'False') : cell}
    //                         </td>
    //                     ))}
    //                 </tr>
    //             ))}
    //         </tbody>
    //     </table>
    // );
    //------------------------------------------------------------------------------------------------
    return (
        <table>
            <tbody>
                {arr.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        {row.map((cell, cellIndex) => (
                            <td key={cellIndex} style={{ textAlign: 'center' }}>
                                {Array.isArray(cell) ? 
                                    <BsFillHouseDoorFill size={30} /> :  // Using the house icon from react-icons
                                    (
                                        cell ? 
                                        <div style={{ backgroundColor: 'green', width: '20px', height: '20px' }}></div> :
                                        <div style={{ backgroundColor: 'red', width: '20px', height: '20px' }}></div>
                                    )
                                }
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );

// # sourceMappingURL=graphVisualization.js.map
}

