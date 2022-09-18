import axios from "axios";
import updateGameState from "./updateGameState";

// getBotAction is a function to get action from bot via API
const getBotAction = async (boardStatus, lineStatus, turn, setBoardStatus, setLineStatus, setTurn, setPlay) => {
    const response = await axios.post("https://dots-and-boxes-api.herokuapp.com/api/bot", { boardStatus, lineStatus });
    let i, j, k;
    if (response.data) {
        [i, j, k] = response.data;
        if (!(lineStatus[i][j][k] === 1)) {
            updateGameState(boardStatus, lineStatus, turn, setBoardStatus, setLineStatus, setTurn, setPlay, i, j, k);
        }
    }
};

export default getBotAction;
