import {Player} from "./Player";

export interface WinningCombination {
    indices: [number, number, number];
    player: Player;
}
