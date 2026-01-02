export type DiceNumber = 1 | 2 | 3 | 4 | 5 | 6;

// 0 0 0
// 0 0 0
// 0 0 0
function getDiceRepresentation(num: DiceNumber): number[] {
    switch (num) {
        case 1:
            return (
                [0, 0, 0,
                    0, 1, 0,
                    0, 0, 0]
            )
        case 2:
            return (
                [1, 0, 0,
                    0, 0, 0,
                    0, 0, 1]
            )
        case 3:
            return (
                [1, 0, 0,
                    0, 1, 0,
                    0, 0, 1]
            )
        case 4:
            return (
                [1, 0, 1,
                    0, 0, 0,
                    1, 0, 1]
            )
        case 5:
            return (
                [1, 0, 1,
                    0, 1, 0,
                    1, 0, 1]
            )
        case 6:
            return (
                [1, 0, 1,
                    1, 0, 1,
                    1, 0, 1]
            )
        default:
            throw new Error("Unrecognized number of dice")
    }
}

export default getDiceRepresentation;
