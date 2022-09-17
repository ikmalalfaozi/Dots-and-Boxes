// getLineColor is function to get color of line with certain value
const getLineColor = (value) => {
    if (value === 1) {
        return "bg-blue-700";
    } else if (value === -1) {
        return "bg-red-700";
    }
    return "";
};

// getBoxColor is function to get color of Box with certain value
const getBoxColor = (value) => {
    if (value === 4) {
        return "bg-blue-300";
    } else if (value === -4) {
        return "bg-red-300";
    }
    return "";
};

export { getLineColor, getBoxColor };
