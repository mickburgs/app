export const getWinningCombinations = (boardSize: number): number[][] => {
    const combinations: number[][] = [];
    const winCondition = boardSize;

    // Horizontal Winning Combinations
    for (let row = 0; row < boardSize; row++) {
        for (let col = 0; col <= boardSize - winCondition; col++) {
            const start = row * boardSize + col;
            const horizontal = Array.from({ length: winCondition }, (_, i) => start + i);
            combinations.push(horizontal);
        }
    }

    // Vertical Winning Combinations
    for (let col = 0; col < boardSize; col++) {
        for (let row = 0; row <= boardSize - winCondition; row++) {
            const start = row * boardSize + col;
            const vertical = Array.from({ length: winCondition }, (_, i) => start + i * boardSize);
            combinations.push(vertical);
        }
    }

    // Diagonal Winning Combinations (Top-Left to Bottom-Right)
    for (let row = 0; row <= boardSize - winCondition; row++) {
        for (let col = 0; col <= boardSize - winCondition; col++) {
            const start = row * boardSize + col;
            const diagonalRight = Array.from({ length: winCondition }, (_, i) => start + i * (boardSize + 1));
            combinations.push(diagonalRight);
        }
    }

    // Diagonal Winning Combinations (Top-Right to Bottom-Left)
    for (let row = 0; row <= boardSize - winCondition; row++) {
        for (let col = winCondition - 1; col < boardSize; col++) {
            const start = row * boardSize + col;
            const diagonalLeft = Array.from({ length: winCondition }, (_, i) => start + i * (boardSize - 1));
            combinations.push(diagonalLeft);
        }
    }

    return combinations;
};