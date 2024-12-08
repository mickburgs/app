import React, {useRef, useState} from 'react';
import {Animated, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import ConfettiCannon from 'react-native-confetti-cannon';
import {GameMode} from "../types/GameMode";
import {Player} from "../types/Player";
import {WinningCombination} from "../types/WinningCombination";


const BOARD_SIZE = 9;
const EMPTY_BOARD: string[] = Array(BOARD_SIZE).fill(null);

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
const AI_PLAYER = Player.O;

const TicTacToeScreen = ({ route }) => {
    const { mode } = route.params;
    const [board, setBoard] = useState(EMPTY_BOARD);
    const [isXNext, setIsXNext] = useState(true);
    const [winner, setWinner] = useState<WinningCombination>(null);
    const [isLocked, setIsLocked] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);
    const boardGlow = useRef(new Animated.Value(0)).current;

    const updateBoard = (board: string[], index: number, player: string): string[] => {
        if (board[index] !== null || winner || isLocked) return;

        const newBoard = [...board];
        newBoard[index] = player;
        setBoard(newBoard);
        return newBoard;
    }

    const handlePress = (index) => {
        const newBoard = updateBoard(board, index, isXNext ? Player.X: Player.O);
        if (!newBoard) return;

        const winningCombination = getWinningCombination(newBoard);
        if (winningCombination) {
            setGameWinner(winningCombination);
            return;
        }

        if (mode === GameMode.Single && isXNext) {
            setIsLocked(true);
            setTimeout(() => makeAIMove(newBoard), 500);
        }
        setIsXNext(!isXNext);
    };

    const setGameWinner = (win: WinningCombination) => {
        const winner = win.player;
        setWinner(win);

        if (winner === AI_PLAYER && mode === GameMode.Single) {
            startGlowAnimation();
            return
        }

        setShowConfetti(true);
    };


    function playerHasAllButOneInCombination(board: string[], a: number, b: number, c: number, player: Player) {
        return [board[a], board[b], board[c]]
            .filter((cell) => cell === player)
            .length === 2;
    }

    const getWinningMove = (board: string[], a: number, b: number, c: number, player: Player): number => {
        if (playerHasAllButOneInCombination(board, a, b, c, player)) {
            const emptyCell = [a, b, c].find((index) => board[index] === null);
            if (emptyCell) {
                return emptyCell;
            }
        }
        return null;
    }

    const makeAIMove = (board: string[]) => {
        for (let combination of winningCombinations) {
            const [a, b, c] = combination;
            const winningMove = getWinningMove(board, a, b, c, AI_PLAYER);
            if (winningMove === null) continue;
            updateBoard(board, winningMove, AI_PLAYER);
            setGameWinner({
                indices: [a, b, c],
                player: AI_PLAYER,
            });
            return;
        }

        const emptyCells = board.map((cell, i) => (cell === null ? i : null)).filter((i) => i !== null);
        const randomMove = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        if (randomMove !== undefined) {
            updateBoard(board, randomMove, AI_PLAYER);
            const gameWinner = getWinningCombination(board);
            if (gameWinner) {
                setGameWinner(gameWinner);
            } else {
                setIsXNext(true);
            }
        }
        setIsLocked(false);
    };

    const resetGame = () => {
        setBoard(EMPTY_BOARD);
        setIsXNext(true);
        setWinner(null);
        setIsLocked(false);
        setShowConfetti(false);
        Animated.timing(boardGlow, {
            toValue: 0,
            duration: 300,
            useNativeDriver: false,
        }).start();
    };

    const getWinningCombination = (board): WinningCombination => {
        for (let combination of winningCombinations) {
            const [a, b, c] = combination;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return {
                    indices: [a, b, c],
                    player: board[a],
                };
            }
        }
        return null;
    };

    const startGlowAnimation = () => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(boardGlow, {
                    toValue: 1,
                    duration: 500,
                    useNativeDriver: false,
                }),
                Animated.timing(boardGlow, {
                    toValue: 0,
                    duration: 500,
                    useNativeDriver: false,
                }),
            ])
        ).start();
    };

    const renderCell = (index) => (
        <TouchableOpacity
            style={styles.cell}
            onPress={() => handlePress(index)}
            disabled={isLocked}
        >
            <Text style={[styles.cellText, board[index] === Player.X ? styles.xText : styles.oText]}>
                {board[index]}
            </Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.status}>
                {winner
                    ? `Winnaar: ${winner.player}`
                    : `Volgende speler: ${isXNext ? Player.X : Player.O}`}
            </Text>
            <Animated.View
                style={[
                    styles.board,
                    {
                        shadowColor: 'red',
                        shadowOpacity: boardGlow,
                        shadowRadius: 20,
                        borderColor: boardGlow.interpolate({
                            inputRange: [0, 1],
                            outputRange: ['#333', '#f00'],
                        }),
                    },
                ]}
            >
                {[0, 1, 2].map((row) => (
                    <View key={row} style={styles.row}>
                        {renderCell(row * 3)}
                        {renderCell(row * 3 + 1)}
                        {renderCell(row * 3 + 2)}
                    </View>
                ))}
            </Animated.View>
            {showConfetti && (
                <ConfettiCannon count={100} origin={{ x: 150, y: 0 }} fadeOut={true} />
            )}
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
