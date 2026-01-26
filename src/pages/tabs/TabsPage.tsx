import {Link} from "react-router-dom";
import Tabs from "../../components/Tabs/Tabs";

const TabsPage = () => {
    const tabs = [
        { id: 1, title: 'HTML', content: 'The HyperText Markup Language or HTML is the standard markup language for documents designed to be displayed in a web browser.' },
        { id: 2, title: 'CSS', content: 'Cascading Style Sheets is a style sheet language used for describing the presentation of a document written in a markup language such as HTML or XML.' },
        { id: 3, title: 'JavaScript', content: 'JavaScript, often abbreviated as JS, is a programming language that is one of the core technologies of the World Wide Web, alongside HTML and CSS.' },
    ];

    return (
        <main className="flex flex-col items-center justify-center w-full p-[32px]">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Tabs</h1>

            <section className="w-full max-w-2xl mb-12 p-6 bg-blue-50 border border-blue-200 rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold text-blue-900 mb-4">Objective: Implement an Accessible Tabs Component</h2>
                <p className="text-blue-800 mb-4">
                    Build a tabs component that displays one panel of content at a time and follows ARIA patterns.
                </p>
                <div className="space-y-2">
                    <p className="font-medium text-blue-900">Key Requirements:</p>
                    <ul className="list-disc list-inside text-blue-800 space-y-1 ml-2">
                        <li>Only one panel's contents should be displayed at a time</li>
                        <li>Highlight the active tab with visual indication (e.g., blue text/border)</li>
                        <li>Support a <code className="bg-blue-100 px-1 rounded">defaultActiveTabId</code> prop</li>
                        <li>Implement ARIA roles: <code className="bg-blue-100 px-1 rounded">tablist</code>, <code className="bg-blue-100 px-1 rounded">tab</code>, and <code className="bg-blue-100 px-1 rounded">tabpanel</code></li>
                        <li>Link tabs and panels using <code className="bg-blue-100 px-1 rounded">aria-controls</code> and <code className="bg-blue-100 px-1 rounded">aria-labelledby</code></li>
                        <li>Implement keyboard navigation: Arrow keys, Home, and End</li>
                        <li>Manage focus and <code className="bg-blue-100 px-1 rounded">tabIndex</code> for accessibility</li>
                    </ul>
                </div>
            </section>

            <section className="w-full max-w-2xl">
                <Tabs tabs={tabs} defaultActiveTabId={2} />
            </section>

            <Link to="/" className="mt-8 text-blue-600 hover:text-blue-800 transition-colors font-medium flex items-center gap-2">
                ← Back to Home
            </Link>
        </main>
    )
}

export default TabsPage;
