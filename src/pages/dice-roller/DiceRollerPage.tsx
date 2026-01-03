import { Link } from 'react-router-dom';
import DiceRoller from "./DiceRoller/DiceRoller";

const DiceRollerPage = () => {
    return (
        <main className="p-8 flex flex-col items-center min-h-screen bg-gray-50">
            <h1 className="text-3xl font-bold mb-8 text-gray-900">Dice Roller</h1>

            <section className="w-full max-w-lg mb-12 p-6 bg-blue-50 border border-blue-200 rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold text-blue-900 mb-4">Objective: Build a Dice Roller App</h2>
                <p className="text-blue-800 mb-4">
                    Create an application that simulates rolling a specified number of 6-sided dice.
                </p>
                <div className="space-y-2">
                    <p className="font-medium text-blue-900">Key Requirements:</p>
                    <ul className="list-disc list-inside text-blue-800 space-y-1 ml-2">
                        <li>Allow users to roll 1 to 12 dice</li>
                        <li>Display dice results in rows of three</li>
                        <li>Use unique keys for re-rolls to ensure proper animations</li>
                        <li>Accessibility: <code className="bg-blue-100 px-1 rounded">aria-live="polite"</code> for results</li>
                        <li>Accessibility: <code className="bg-blue-100 px-1 rounded">role="img"</code> and <code className="bg-blue-100 px-1 rounded">aria-label</code> for dice visual representation</li>
                        <li>Accessibility: <code className="bg-blue-100 px-1 rounded">aria-describedby</code> for input range explanation</li>
                        <li>Accessibility: <code className="bg-blue-100 px-1 rounded">role="region"</code> for the results container</li>
                    </ul>
                </div>
            </section>

            <div className="flex flex-col items-center gap-6 bg-white p-8 rounded-2xl shadow-xl border border-gray-100 w-full max-w-lg">
                <DiceRoller />
            </div>
            <Link to="/" className="mt-8 text-blue-600 hover:text-blue-800 transition-colors font-medium flex items-center gap-2">
                ← Back to Home
            </Link>
        </main>
    );
};

export default DiceRollerPage;
