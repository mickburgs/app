import React, {useRef, useState} from 'react';
import {Animated, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {GameMode} from "../types/GameMode";
import {Player, PlayerColor} from "../types/Player";
import {WinningCombination} from "../types/WinningCombination";
import {Difficulty} from "../types/Difficulty";
import {getWinningCombinations} from "../utils/gameUtils";
import ScreenWrapper from "../components/ScreenWrapper";

const AI_PLAYER = Player.O;

const TicTacToeScreen = ({route}) => {
    const {mode, difficulty, boardSize} = route.params;
    const getBoardCells = (boardSize: number): number => {
        return boardSize * boardSize;
    };
    const getEmptyBoard = (size: number): Player[] => {
        return Array(getBoardCells(size)).fill(null);
    };

    const [board, setBoard] = useState(getEmptyBoard(boardSize));
    const [isXNext, setIsXNext] = useState(true);
    const [winner, setWinner] = useState<WinningCombination>(null);
    const [isLocked, setIsLocked] = useState(false);

    const boardGlow = useRef(new Animated.Value(0)).current;
    const cellAnimations = useRef(Array(getBoardCells(boardSize)).fill(null).map(() => new Animated.Value(1))).current;

    const updateBoard = (board: Player[], index: number, player: Player): Player[] => {
        if (board[index] !== null || winner || isLocked) return;

        const newBoard = [...board];
        newBoard[index] = player;
        setBoard(newBoard);
        return newBoard;
    };

    const handlePress = (index) => {
        const newBoard = updateBoard(board, index, isXNext ? Player.X : Player.O);
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
        setWinner(win);

        animateWinningCells(win.indices);
        startGlowAnimation();
    };

    const animateWinningCells = (indices: number[]) => {
        indices.forEach((index) => {
            Animated.loop(
                Animated.sequence([
                    Animated.timing(cellAnimations[index], {
                        toValue: 1.5, // Scale up
                        duration: 500,
                        useNativeDriver: true,
                    }),
                    Animated.timing(cellAnimations[index], {
                        toValue: 1, // Scale down
                        duration: 500,
                        useNativeDriver: true,
                    }),
                ])
            ).start();
        });
    };

    const getWinningMove = (board: Player[], combination: number[], player: Player): number | null => {
        const playerCells = combination.filter((index) => board[index] === player);
        const emptyCell = combination.find((index) => board[index] === null);

        if (emptyCell !== undefined && playerCells.length === combination.length - 1) {
            return emptyCell;
        }
        return null;
    };

    const findWinningMove = (board: Player[], player: Player): number | null => {
        for (const combination of getWinningCombinations(boardSize)) {
            const winningMove = getWinningMove(board, combination, player);
            if (winningMove !== null) {
                return winningMove;
            }
        }
        return null;
    };

    const makeAIMove = (board: Player[]) => {
        const combinations = getWinningCombinations(boardSize);

        for (const combination of combinations) {
            const winningMove = getWinningMove(board, combination, AI_PLAYER);
            if (winningMove !== null) {
                updateBoard(board, winningMove, AI_PLAYER);
                setGameWinner({
                    indices: combination,
                    player: AI_PLAYER,
                });
                return;
            }
        }

        const nextMove = getAiMove(board);
        updateBoard(board, nextMove, AI_PLAYER);
        const gameWinner = getWinningCombination(board);
        if (gameWinner) {
            setGameWinner(gameWinner);
        } else {
            setIsXNext(true);
        }
        setIsLocked(false);
    };


    const getAiMove = (board: Player[]): number => {
        if (difficulty === Difficulty.Hard) {
            // Block player X from winning
            const winningMove = findWinningMove(board, Player.X);
            if (winningMove !== null) {
                return winningMove;
            }
        }
        return getRandomMove(board);
    }

    const getRandomMove = (board: Player[]): number => {
        const emptyCells = board
            .map((cell, i) => (cell === null ? i : null))
            .filter((i) => i !== null);
        return emptyCells[Math.floor(Math.random() * emptyCells.length)];
    }

    const resetGame = () => {
        setBoard(getEmptyBoard(boardSize));
        setIsXNext(true);
        setWinner(null);
        setIsLocked(false);

        cellAnimations.forEach((anim) => anim.setValue(1));

        Animated.timing(boardGlow, {
            toValue: 0,
            duration: 300,
            useNativeDriver: false,
        }).start();
    };

    const getWinningCombination = (board: Player[]): WinningCombination | null => {
        for (const combination of getWinningCombinations(boardSize)) {
            const player = board[combination[0]];

            // Check if all cells in the combination are occupied by the same player
            if (player && combination.every((index) => board[index] === player)) {
                return {
                    indices: combination,
                    player,
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
            <Animated.View
                style={{
                    transform: [{scale: cellAnimations[index]}],
                }}
            >
                <Text style={[
                    styles.cellText,
                    {color: getPlayerColor(board[index])},
                    board[index] && styles.textShadow,
                ]}>
                    {board[index]}
                </Text>
            </Animated.View>
        </TouchableOpacity>
    );

    const getPlayerColor = (player: Player): string => {
        if (!player) return 'white';
        return PlayerColor[player];
    }

    const getPostGameColor = () => {
        return getPlayerColor(winner?.player);
    }

    return (
        <ScreenWrapper>
                <Text
                    style={[
                        styles.status,
                        {color: getPostGameColor()},
                    ]}
                >
                    {winner
                        ? `Winnaar: ${winner.player}`
                        : `Volgende speler: ${isXNext ? Player.X : Player.O}`}
                </Text>
                <Animated.View
                    style={[
                        styles.board,
                        {
                            // shadowColor: 'black',
                            // shadowOpacity: boardGlow,
                            // shadowRadius: 20,
                            borderColor: boardGlow.interpolate({
                                inputRange: [0, 1],
                                outputRange: [
                                    'black',
                                    getPostGameColor()
                                ],
                            }),
                        },
                    ]}
                >
                    {Array(boardSize).fill(null).map((_, rowIndex) => (
                        <View key={`row-${rowIndex}`} style={styles.row}>
                            {Array(boardSize).fill(null).map((_, colIndex) => (
                                <React.Fragment key={`cell-${rowIndex}-${colIndex}`}>
                                    {renderCell(rowIndex * boardSize + colIndex)}
                                </React.Fragment>
                            ))}
                        </View>
                    ))}
                </Animated.View>
                <TouchableOpacity style={styles.resetButton} onPress={resetGame}>
                    <Text style={styles.resetButtonText}>Opnieuw spelen</Text>
                </TouchableOpacity>
        </ScreenWrapper>
    );
};

const styles = StyleSheet.create({
    status: {
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 20,
    },
    board: {
        width: 300,
        height: 300,
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: '#333',
        borderRadius: 10,
        overflow: 'hidden',
        elevation: 5,
        shadowColor: '#000',
        boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)',
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
        fontSize: 50,
        fontWeight: 'bold',
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
    textShadow: {
        textShadowColor: 'rgba(0, 0, 0, 0.6)',
        textShadowOffset: {width: 2, height: 2},
        textShadowRadius: 5,
    }
});

export default TicTacToeScreen;
