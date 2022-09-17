// updateGameState is procedure to update state of game
const updateGameState = (boardStatus, lineStatus, turn, setBoardStatus, setLineStatus, setTurn, setPlay, i, j, k) => {
    let isBoxFormed = false;
    const length = 4;
    const width = 4;

    if (i === 0) {
        if (j === 0) {
            boardStatus[j][k] += 1;
            if (boardStatus[j][k] === 4) {
                if (turn[0]) boardStatus[j][k] = -4;
                isBoxFormed = true;
            }
        } else if (j === length - 1) {
            boardStatus[j - 1][k] += 1;
            if (boardStatus[j - 1][k] === 4) {
                if (turn[0]) boardStatus[j - 1][k] = -4;
                isBoxFormed = true;
            }
        } else {
            boardStatus[j - 1][k] += 1;
            boardStatus[j][k] += 1;
            if (boardStatus[j - 1][k] === 4 || boardStatus[j][k] === 4) {
                if (turn[0] && boardStatus[j - 1][k] === 4) boardStatus[j - 1][k] = -4;
                if (turn[0] && boardStatus[j][k] === 4) boardStatus[j][k] = -4;
                isBoxFormed = true;
            }
        }
    } else {
        if (j === 0) {
            boardStatus[k][j] += 1;
            if (boardStatus[k][j] === 4) {
                if (turn[0]) boardStatus[k][j] = -4;
                isBoxFormed = true;
            }
        } else if (j === width - 1) {
            boardStatus[k][j - 1] += 1;
            if (boardStatus[k][j - 1] === 4) {
                if (turn[0]) boardStatus[k][j - 1] = -4;
                isBoxFormed = true;
            }
        } else {
            boardStatus[k][j - 1] += 1;
            boardStatus[k][j] += 1;
            if (boardStatus[k][j - 1] === 4 || boardStatus[k][j] === 4) {
                if (turn[0] && boardStatus[k][j - 1] === 4) boardStatus[k][j - 1] = -4;
                if (turn[0] && boardStatus[k][j] === 4) boardStatus[k][j] = -4;
                isBoxFormed = true;
            }
        }
    }

    if (turn[0]) {
        lineStatus[i][j][k] = -1;
    } else {
        lineStatus[i][j][k] = 1;
    }

    setLineStatus(lineStatus);
    setBoardStatus(boardStatus);

    if (isBoxFormed) {
        setTurn((turn) => [turn[0], turn[1] + 1]);
    } else {
        setTurn((turn) => [!turn[0], turn[1] + 1]);
    }

    if (turn[1] === 24) {
        setPlay(false);
    }
};

export default updateGameState;
