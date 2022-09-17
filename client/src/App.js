import { useState } from "react";
import { initialBoardStatus, initialLineStatus } from "./utils/dummyArray";
import createGameBoard from "./utils/createGameBoard";
import getBotAction from "./utils/getBotAction";
import getScore from "./utils/getScore";

function App() {
    const [lineStatus, setLineStatus] = useState(initialLineStatus()); // lineStatus represents the state of the line whether a line has been formed or not
    const [boardStatus, setBoardStatus] = useState(initialBoardStatus()); // boardStatus represents the state of box whether a box has been formed or not
    const [turn, setTurn] = useState([true, 0]); // turn represents the turn of the game and what state, true for player, false for bot
    const [play, setPlay] = useState(false); // play represents the start of the game

    // setInitialGameState to set the initial state of the game
    const setInitialGameState = () => {
        setLineStatus(initialLineStatus());
        setBoardStatus(initialBoardStatus());
        setTurn([true, 1]);
        setPlay(true);
    };

    // handlePlay to handle play button
    const handlePlay = () => {
        if (!play) {
            setInitialGameState();
        }
    };

    // handleReset to handle reset button
    const handleReset = () => {
        if (play) {
            setInitialGameState();
        }
    };

    // sleep to give pause when creating a line
    function sleep(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    // Check bot turn
    if (!turn[0] && turn[1] !== 25) {
        sleep(200).then(() => {
            getBotAction(boardStatus, lineStatus, turn, setBoardStatus, setLineStatus, setTurn, setPlay);
        });
    }

    return (
        <div className="App flex flex-col ">
            <header className="flex bg-blue-600 h-12 justify-center items-center text-white text-2xl font-bold">Dots and Boxes</header>
            <main className="flex flex-col mt-12 w-full items-center">
                <div className="font-semibold text-lg mb-3">Turn: {turn[1] ? (turn[0] ? "Player" : "Bot") : ""}</div>
                <div className="board-game px-8 py-8 border-2 rounded-md shadow-2xl">
                    <div className={`flex justify-center items-center w-[304px] h-[306px] bg-blue-800 text-[30px] rounded-lg text-center text-white font-bold ${play || turn[1] === 25 ? "hidden" : ""}`}>DOTS AND BOXES GAME</div>
                    <div className={`${play && turn[1] !== 25 ? "" : "hidden"} w-[304px] h-[306px]`}>{createGameBoard(boardStatus, lineStatus, turn, setBoardStatus, setLineStatus, setTurn, setPlay)}</div>
                    <div className={`${turn[1] === 25 ? "" : "hidden"} flex flex-col items-center justify-center w-[304px] h-[306px] bg-blue-800 text-[24px] text-white font-bold rounded-lg`}>
                        <span>SCORE</span>
                        <span>PLAYER: {getScore(boardStatus)[1]}</span>
                        <span>BOT: {getScore(boardStatus)[0]}</span>
                    </div>
                </div>
                <div className="flex button-game mt-8">
                    <button className={`m-4 py-1 w-28 text-lg text-white font-semibold ${play ? "cursor-default bg-blue-300" : "cursor-pointer bg-blue-600 hover:bg-blue-800"} rounded-2xl shadow-2xl`} onClick={handlePlay}>
                        Play
                    </button>
                    <button className={`m-4 py-1 w-28 ${play ? "bg-blue-600 hover:bg-blue-800 cursor-pointer" : "bg-blue-300"} text-lg text-white font-semibold rounded-2xl shadow-2xl`} onClick={handleReset}>
                        Reset
                    </button>
                </div>
                <div className="help my-8">
                    <div className="flex justify-center mb-4 text-lg font-semibold">How To Play</div>
                    <ul className="list-decimal">
                        <li>Each turn, drag between two horizontally or vertically adjacent dots to draw a line.</li>
                        <li>Drawing the 4th wall of a box wins it, earning you a point. When you close a box you must move again.</li>
                        <li>Lines are drawn until all squares are claimed. The player with the most claimed squares wins!</li>
                        <li>Be careful not to create long chains of boxes for your opponents to claim Think of creative ways to double cross your opponent, forcing them to give you the long chains!</li>
                    </ul>
                </div>
            </main>
        </div>
    );
}

export default App;
