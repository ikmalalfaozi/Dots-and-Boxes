// getScore is function to get score for bot and player
const getScore = (boardStatus) => {
    let player = 0;
    let bot = 0;
    for (let row of boardStatus) {
        for (let col of row) {
            if (col === 4) {
                bot += 1;
            } else {
                player += 1;
            }
        }
    }
    return [bot, player];
};

export default getScore;
