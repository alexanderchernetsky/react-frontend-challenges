import {Link} from "react-router-dom";
import HolyGrail from "./HolyGrail/HolyGrail";

const HolyGrailPage = () => {
    return (
        <main className="flex flex-col items-center w-full">
            <h1 className="text-3xl font-bold text-gray-900 my-8">Holy Grail Layout</h1>

            <section className="w-full max-w-3xl mb-12 p-6 bg-blue-50 border border-blue-200 rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold text-blue-900 mb-4">Objective: Implement the Holy Grail Layout</h2>
                <p className="text-blue-800 mb-4">
                    The Holy Grail layout is a classic CSS challenge consisting of a header, footer, and three columns.
                </p>
                <div className="space-y-2">
                    <p className="font-medium text-blue-900">Key Requirements:</p>
                    <ul className="list-disc list-inside text-blue-800 space-y-1 ml-2">
                        <li>Header: Stretches across the page, 60px tall</li>
                        <li>Footer: Stretches across the page, 100px tall, stays at the bottom</li>
                        <li>Columns: Left and right columns have a fixed width of 100px</li>
                        <li>Center Column: Fluid-width (fills remaining space)</li>
                        <li>All columns must have equal height regardless of content</li>
                        <li>Use CSS Grid for the 3-column layout</li>
                        <li>Ensure the layout fills at least the full viewport height</li>
                    </ul>
                </div>
            </section>

            <div className="w-full border-t border-gray-200">
                <HolyGrail />
            </div>

            <Link to="/" className="my-8 text-blue-600 hover:text-blue-800 transition-colors font-medium flex items-center gap-2">
                ← Back to Home
            </Link>
        </main>
    )
}

export default HolyGrailPage;
