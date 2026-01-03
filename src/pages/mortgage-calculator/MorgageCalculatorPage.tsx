import MortgageCalculator from "./MortgageCalculator/MortgageCalculator";

const MortgageCalculatorPage = () => {
    return (
        <main className="flex flex-col items-center justify-center w-full p-[32px]">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Mortgage Calculator</h1>

            <section className="w-full max-w-4xl mb-12 p-6 bg-blue-50 border border-blue-200 rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold text-blue-900 mb-4">Objective: Build a Mortgage Calculator</h2>
                <p className="text-blue-800 mb-4">
                    Create a widget that calculates monthly mortgage payments, total payments, and total interest.
                </p>
                <div className="space-y-2">
                    <p className="font-medium text-blue-900">Key Requirements:</p>
                    <ul className="list-disc list-inside text-blue-800 space-y-1 ml-2">
                        <li>Inputs for Loan Amount ($), Interest Rate (%), and Loan Term (years)</li>
                        <li>Calculate and display: Monthly Payment, Total Payment, and Total Interest</li>
                        <li>Validate inputs and display error messages for non-numerical or invalid values</li>
                        <li>Round all result amounts to 2 decimal places</li>
                        <li>Accessibility: Use <code className="bg-blue-100 px-1 rounded">aria-live</code> for dynamic result updates</li>
                        <li>Accessibility: Use <code className="bg-blue-100 px-1 rounded">aria-describedby</code> and <code className="bg-blue-100 px-1 rounded">aria-invalid</code> for validation errors</li>
                    </ul>
                </div>
            </section>

            <section className="w-full">
                <MortgageCalculator />
            </section>
        </main>
    )
}

export default MortgageCalculatorPage;
