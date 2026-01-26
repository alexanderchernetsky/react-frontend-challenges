import {Link} from "react-router-dom";
import AddMileageForm from "./AddMileageForm/AddMileageForm";

const AddMileagePage = () => {
    return (
        <main className="flex flex-col items-center justify-center w-full p-[32px]">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Add Mileage</h1>

            <section className="w-full max-w-xl mb-12 p-6 bg-blue-50 border border-blue-200 rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold text-blue-900 mb-4">Objective: Create a Mileage Form</h2>
                <p className="text-blue-800 mb-4">
                    Build a form with dynamic fields, API integration, and automatic field pre-filling.
                </p>
                <div className="space-y-2">
                    <p className="font-medium text-blue-900">Key Requirements:</p>
                    <ul className="list-disc list-inside text-blue-800 space-y-1 ml-2">
                        <li>Implement a dynamic "Destinations" field (add/remove destinations)</li>
                        <li>Fetch destination values from an API</li>
                        <li>Automatically pre-fill "Expense Name" as "Starting Point - Destination"</li>
                        <li>POST form data to an external API on submission</li>
                        <li>Clear the form after successful submission</li>
                        <li>Use controlled components for form state management</li>
                    </ul>
                </div>
            </section>

            <section className="w-full">
                <AddMileageForm />
            </section>

            <Link to="/" className="mt-8 text-blue-600 hover:text-blue-800 transition-colors font-medium flex items-center gap-2">
                ← Back to Home
            </Link>
        </main>
    )
}

export default AddMileagePage;
