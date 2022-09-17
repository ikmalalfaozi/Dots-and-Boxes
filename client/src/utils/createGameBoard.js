import { getLineColor, getBoxColor } from "./getColor";
import updateGameState from "./updateGameState";

// createGameBoard to make a game board
const createGameBoard = (boardStatus, lineStatus, turn, setBoardStatus, setLineStatus, setTurn, setPlay) => {
    let board = [];
    for (let i = 0; i < 7; i++) {
        if (i !== 0) {
            board.push(<br key={i} />);
        }
        for (let j = 0; j < 7; j++) {
            if (i % 2 === 0 && j % 2 === 0) {
                // dots
                board.push(<span key={[i, j]} className="relative z-50 inline-block w-4 h-4 rounded-full bg-black"></span>);
            } else if (i % 2 === 0 && j % 2 === 1) {
                // horizontal line
                board.push(
                    <span
                        key={[i, j]}
                        className={`relative z-20 ml-[-16px] mr-[-16px] inline-block w-28 h-4 rounded-full ${turn[0] && !lineStatus[0][i / 2][(j - 1) / 2] ? "cursor-pointer hover:bg-gray-200" : ""} ${getLineColor(
                            lineStatus[0][i / 2][(j - 1) / 2]
                        )}`}
                        onClick={() => {
                            if (turn[0] && !lineStatus[0][i / 2][(j - 1) / 2]) {
                                updateGameState(boardStatus, lineStatus, turn, setBoardStatus, setLineStatus, setTurn, setPlay, 0, i / 2, (j - 1) / 2);
                            }
                        }}
                    ></span>
                );
            } else if (j % 2 === 0) {
                // vertical line
                board.push(
                    <span
                        key={[i, j]}
                        className={`relative z-20 mt-[-16px] mb-[-16px] inline-block w-4 h-24 rounded-full ${turn[0] && !lineStatus[1][j / 2][(i - 1) / 2] ? "cursor-pointer hover:bg-gray-200" : ""} ${getLineColor(
                            lineStatus[1][j / 2][(i - 1) / 2]
                        )}`}
                        onClick={() => {
                            if (turn[0] && !lineStatus[1][j / 2][(i - 1) / 2]) {
                                updateGameState(boardStatus, lineStatus, turn, setBoardStatus, setLineStatus, setTurn, setPlay, 1, j / 2, (i - 1) / 2);
                            }
                        }}
                    ></span>
                );
            } else {
                // box
                board.push(<span key={[i, j]} className={`relative z-0 mt-[-16px] mb-[-16px] ml-[-16px] mr-[-16px] inline-block w-28 h-24 ${getBoxColor(boardStatus[(i - 1) / 2][(j - 1) / 2])}`}></span>);
            }
        }
    }
    return board;
};

export default createGameBoard;
