function isCellRowVisible(top, row, rowHeight, rowNum) {
    return (top < -(row + 2) * rowHeight || top > (-row * rowHeight) + (rowNum + 2) * rowHeight) ? false : true;
}

function isCellColVisible(left, col, colWidth, colNum) {
    return (left < - (col + 2) * colWidth || left > (-col * colWidth) + (colNum + 2) * colWidth) ? false : true;
}

export {isCellRowVisible, isCellColVisible};