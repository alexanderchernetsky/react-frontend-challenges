import {Link} from "react-router-dom";
import ProgressBars from "./ProgressBars/ProgressBars";

const ProgressBarsPage = () => {
    return (
        <main className="flex flex-col items-center justify-center w-full p-[32px]">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Progress Bars</h1>

            <section className="w-full max-w-xl mb-12 p-6 bg-blue-50 border border-blue-200 rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold text-blue-900 mb-4">Objective: Implement Progress Bars</h2>
                <p className="text-blue-800 mb-4">
                    Create an application where progress bars can be added dynamically and fill up over time.
                </p>
                <div className="space-y-2">
                    <p className="font-medium text-blue-900">Key Requirements:</p>
                    <ul className="list-disc list-inside text-blue-800 space-y-1 ml-2">
                        <li>Clicking "Add" creates a new progress bar</li>
                        <li>Bars start filling smoothly as soon as they are added</li>
                        <li>Each bar takes approximately 2000ms to complete</li>
                        <li>Use <code className="bg-blue-100 px-1 rounded">setInterval</code> for progress updates</li>
                        <li>Maintain independent state for each bar</li>
                    </ul>
                </div>
            </section>

            <section className="w-full flex justify-center">
                <ProgressBars />
            </section>

            <Link to="/" className="mt-8 text-blue-600 hover:text-blue-800 transition-colors font-medium flex items-center gap-2">
                ← Back to Home
            </Link>
        </main>
    )
}

export default ProgressBarsPage;
