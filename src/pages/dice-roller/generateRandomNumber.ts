import {DiceNumber} from "./getDiceRepresentation";

// function overloading
export function generateRandomNumber(min: 1, max: 6): DiceNumber;
export function generateRandomNumber(min: number, max: number): number;
export function generateRandomNumber(min: number, max: number) {
    // input validation
    if (max <= min) {
        throw new Error("Invalid min and max values");
    }

    // generate number
    const random = Math.floor(Math.random() * (max - min + 1)) + min; // [min, max]

    return random;
}

