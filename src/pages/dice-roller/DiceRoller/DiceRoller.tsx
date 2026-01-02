import {ChangeEvent, FormEvent, useState} from "react";
import Dice from "../Dice/Dice";
import {generateRandomNumber} from "../generateRandomNumber";
import {DiceNumber} from "../getDiceRepresentation";

// OBJECTIVE:
// Build a dice roller app that simulates the results of rolling a specified number of 6-sided dice.
//
// Requirements:
// The user can specify the number of dice to roll using the input field and the value can be an integer between 1 to 12 inclusive.
// Upon clicking the "Roll" button, the dice roll is simulated and the results are displayed.
// The results of the dice roll should be displayed in rows of three.
// The example below shows a potential result of rolling 6 dice.


// Notes:
// for type safety use function overloading: export function generateRandomNumber(min: 1, max: 6): DiceNumber; export function generateRandomNumber(min: number, max: number): number;
// don't use index as dice key - When you re-roll, React might not properly animate/update components because keys don't change. Use roll counter to fix this.
// Accessibility:
// aria-describedby on input + span with explanation (sr-only) Benefit: Context about valid input range. ForL Screen reader users.
// aria-live="polite". Benefit: Auto-announcement of dice results. For: Blind users
// role="img" on dice. Benefit: Treats dots as a single unit. For: Screen reader users.
// aria-hidden on dots. Benefit: Prevents verbose announcements. For:Screen reader users
// aria-label on dice. Benefit: Semantic meaning of visual. For: Blind users
// role="region" on dice results wrapper. Benefit: Landmark navigation. For:Power screen reader users
const DiceRoller = () => {
    const [numberOfDice, setNumberOfDice] = useState(1);
    const [dice, setDice] = useState<DiceNumber[]>([]);
    const [rollId, setRollId] = useState(0);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = Number(event.target.value);
        if (!Number.isNaN(value) && value >= 1 && value <= 12) {
            setNumberOfDice(value);
        }
    }

    const handleRollDice = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setRollId(prev => prev + 1);

        const res: DiceNumber[] = [];

        for (let i = 0; i < numberOfDice; i++) {
            const num = generateRandomNumber(1, 6);
            res.push(num);
        }

        setDice(res);
    }

    return (
        <div className="w-full space-y-8">
            <div className="flex flex-col space-y-4">
                <form className="flex flex-col space-y-2" onSubmit={handleRollDice}>
                    <label htmlFor="numberOfDice" className="text-sm font-semibold text-gray-700">
                        Number of dice
                    </label>
                    <div className="flex space-x-4">
                        <input
                            id="numberOfDice"
                            type="number"
                            value={numberOfDice}
                            onChange={handleInputChange}
                            min={1}
                            max={12}
                            className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-gray-900"
                            aria-label={'Set number of dice to roll'}
                            aria-describedby="dice-help"
                        />
                        <span id="dice-help" className="sr-only">
                            Enter a number between 1 and 12
                        </span>
                        <button
                            type="submit"
                            className="px-8 py-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold rounded-lg shadow-md transition-colors"
                            aria-label={'Roll dice'}
                        >
                            Roll
                        </button>
                    </div>
                </form>
            </div>
            <div role="region" aria-live="polite" aria-label="Dice roll results"  className="grid grid-cols-3 gap-6 bg-gray-100 p-6 rounded-2xl shadow-inner min-h-[200px] items-center justify-items-center">
                {dice.length > 0 ? (
                    dice.map((num, index) => <Dice key={`${rollId}-${index}`} num={num} />)
                ) : (
                    <div className="col-span-full text-gray-800 italic">
                        Ready to roll!
                    </div>
                )}
            </div>
        </div>
    )
}

export default DiceRoller;
