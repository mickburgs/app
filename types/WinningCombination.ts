import {Player} from "./Player";

export interface WinningCombination {
    filledCell: number,
    indices: [number, number, number];
    player: Player;
}
