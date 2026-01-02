import { Link } from 'react-router-dom';
import DiceRoller from "./DiceRoller/DiceRoller";

const DiceRollerPage = () => {
    return (
        <main className="p-8 flex flex-col items-center min-h-screen bg-gray-50">
            <h1 className="text-3xl font-bold mb-8 text-gray-900">Dice Roller</h1>
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
