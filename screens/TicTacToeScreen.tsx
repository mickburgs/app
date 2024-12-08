import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const TicTacToeScreen = ({ route }) => {
    const { mode } = route.params;
    const [board, setBoard] = useState(Array(9).fill(null));
    const [isXNext, setIsXNext] = useState(true);
    const [winner, setWinner] = useState(null);
    const [isLocked, setIsLocked] = useState(false);

    const handlePress = (index) => {
        if (board[index] !== null || winner || isLocked) return;

        const newBoard = [...board];
        newBoard[index] = isXNext ? 'X' : 'O';
        setBoard(newBoard);

        const gameWinner = checkWinner(newBoard);
        if (gameWinner) {
            setWinner(gameWinner);
        } else {
            if (mode === 'single' && isXNext) {
                setIsLocked(true);
                setTimeout(() => makeAIMove(newBoard), 500);
            }
            setIsXNext(!isXNext);
        }
    };

    const makeAIMove = (board) => {
        const emptyCells = board.map((cell, i) => (cell === null ? i : null)).filter((i) => i !== null);
        const randomMove = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        if (randomMove !== undefined) {
            board[randomMove] = 'O';
            setBoard([...board]);
            const gameWinner = checkWinner(board);
            if (gameWinner) {
                setWinner(gameWinner);
            } else {
                setIsXNext(true);
            }
        }
        setIsLocked(false);
    };

    const resetGame = () => {
        setBoard(Array(9).fill(null));
        setIsXNext(true);
        setWinner(null);
        setIsLocked(false);
    };

    const checkWinner = (board) => {
        const winningCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (let combination of winningCombinations) {
            const [a, b, c] = combination;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return board[a];
            }
        }
        return null;
    };

    const renderCell = (index) => (
        <TouchableOpacity
            style={styles.cell}
            onPress={() => handlePress(index)}
            disabled={isLocked}
        >
            <Text style={[styles.cellText, board[index] === 'X' ? styles.xText : styles.oText]}>
                {board[index]}
            </Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.status}>
                {winner
                    ? `Winnaar: ${winner}`
                    : `Volgende speler: ${isXNext ? 'X' : mode === 'multi' ? 'O' : 'AI'}`}
            </Text>
            <View style={styles.board}>
                {[0, 1, 2].map((row) => (
                    <View key={row} style={styles.row}>
                        {renderCell(row * 3)}
                        {renderCell(row * 3 + 1)}
                        {renderCell(row * 3 + 2)}
                    </View>
                ))}
            </View>
            <TouchableOpacity style={styles.resetButton} onPress={resetGame}>
                <Text style={styles.resetButtonText}>Herstart Spel</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f7f7f7',
        paddingHorizontal: 20,
    },
    status: {
        fontSize: 20,
        fontWeight: '600',
        color: '#555',
        marginBottom: 20,
    },
    board: {
        width: 300,
        height: 300,
        backgroundColor: '#fff',
        borderWidth: 2,
        borderColor: '#333',
        borderRadius: 10,
        overflow: 'hidden',
    },
    row: {
        flex: 1,
        flexDirection: 'row',
    },
    cell: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ddd',
        backgroundColor: '#fafafa',
    },
    cellText: {
        fontSize: 36,
        fontWeight: 'bold',
    },
    xText: {
        color: '#ff5a5a',
    },
    oText: {
        color: '#4caf50',
    },
    resetButton: {
        marginTop: 20,
        paddingVertical: 10,
        paddingHorizontal: 30,
        backgroundColor: '#4caf50',
        borderRadius: 5,
    },
    resetButtonText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#fff',
    },
});

export default TicTacToeScreen;
