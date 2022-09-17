// initialLineStatus return array of line status in initial state
const initialLineStatus = () => {
    return Array(2)
        .fill()
        .map((e) =>
            Array(4)
                .fill()
                .map((e) =>
                    Array(3)
                        .fill(0)
                        .map((e) => e)
                )
        );
};

// initialBoardStatus return array of box status in initial state
const initialBoardStatus = () => {
    return Array(3)
        .fill()
        .map((e) =>
            Array(3)
                .fill(0)
                .map((e) => e)
        );
};

export { initialLineStatus, initialBoardStatus };
