import {useState} from "react";

// OBJECTIVE
// Build a simple mortgage calculator widget that takes in a loan amount, interest rate, loan term, and calculates the monthly mortgage payment, total payment amount, and total interest paid.
//
// Requirements:
// The user should be able to enter:
// Loan amount ($)
// Annual interest rate (%). This is also known as the annual percentage rate (APR)
// Loan term (in years)
// Using the inputs, the calculator should compute the following and display the results to the user:
// Monthly mortgage payment
// Total payment amount
// Total interest paid
// If a non-numerical string is entered into any input field, the calculator should display an error message. Additionally, the calculator should handle any other invalid inputs that may arise.
// Round the result amounts to 2 decimal places.
// The last two requirements might not be given to you during interviews, you're expected to clarify.
//
// The formula for calculating the monthly payment is:
//
// M = P(i(1+i)n)/((1+i)n - 1)
//
// M: Monthly mortgage payment
// P: Loan amount
// i: Monthly interest rate (APR / 12)
// n: Total number of payments (loan term in years x 12)

interface CalculatorResults {
    monthlyPayment?: number,
    totalPayment?: number,
    totalInterest?: number,
}

// Notes:
// for non-numerical validation use isNaN(Number(value))
// don't use defaultValue in a controlled form - it's redundant.
// use aria-live for the dynamic content. Place it on the container that actually changes, not the whole page.
// accessibility for validation messages:  aria-describedby={errors?.loanAmount ? "loan-amount-error" : undefined} aria-invalid={!!errors?.loanAmount}
const MortgageCalculator = () => {
    const [loanAmount, setLoanAmount] = useState('');
    const [interestRate, setInterestRate] = useState('');
    const [loanTerm, setLoanTerm] = useState(10);
    const [results, setResults] = useState<CalculatorResults>({});
    const [errors, setErrors] = useState<Record<string, string>>({});


    const handleLoanAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        // If a non-numerical string is entered into any input field, the calculator should display an error message
        // validate input and set errors
        if (!value || isNaN(Number(value)) || Number(value) <= 0) {
            setErrors(prev => {
                return {
                    ...prev,
                    loanAmount: 'Loan amount is not valid'
                }
            });
        } else {
            setErrors(prev => {
                const updated = {...prev};
                delete updated.loanAmount;
                return updated;
            });
        }

        setLoanAmount(value);
    }

    const handleLoanTermChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;

        // validate input and set errors
        if (!value || isNaN(Number(value)) || Number(value) <= 0) {
            setErrors(prev => {
                return {
                    ...prev,
                    loanTerm: 'Loan term is not valid'
                }
            });
        } else {
            setErrors(prev => {
                const updated = {...prev};
                delete updated.loanTerm;
                return updated;
            });
        }

        setLoanTerm(Number(value));
    }

    const handleInterestChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        // validate input and set errors
        if (!value || isNaN(Number(value)) || Number(value) <= 0) {
            setErrors(prev => {
                return {
                    ...prev,
                    interestRate: 'Interest rate is not valid'
                }
            });
        } else {
            setErrors(prev => {
                const updated = {...prev};
                delete updated.interestRate;
                return updated;
            });
        }

        setInterestRate(value);
    }

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Just check if there are existing errors
        if (Object.keys(errors).length > 0) {
            return;
        }

        // calculate monthly payment
        // The formula for calculating the monthly payment is:
        //
        // M = P(i(1+i)n)/((1+i)n - 1)
        // M: Monthly mortgage payment
        // P: Loan amount
        // i: Monthly interest rate (APR / 12)
        // n: Total number of payments (loan term in years x 12)

        const i = Number(interestRate) / 100 / 12; // Monthly interest rate
        const n = Number(loanTerm) * 12; // Total number of payments
        const monthlyPayment = Number(loanAmount) * (i * Math.pow(1 + i, n)) / (Math.pow(1 + i, n) - 1);
        const totalPayment = monthlyPayment * n;
        const totalInterest = totalPayment - Number(loanAmount);
        setResults({monthlyPayment, totalPayment, totalInterest});
    }


    const isCalculateDisabled = Object.keys(errors).length > 0 || !loanAmount || !interestRate || !loanTerm;

    return (
        <div className="flex flex-col md:flex-row justify-center items-start gap-8 p-6 bg-white rounded-xl shadow-lg max-w-4xl mx-auto mt-10">
            <form id="mortgage-calculator-form" onSubmit={handleFormSubmit} className="flex flex-col gap-6 w-full md:w-1/2">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Mortgage Calculator</h2>

                <div className="flex flex-col gap-2">
                    <label htmlFor="loan-amount" className="text-sm font-medium text-gray-700">Loan amount ($)</label>
                    <input
                        type="text"
                        name="loan-amount"
                        id="loan-amount"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                        placeholder="e.g. 300,000"
                        value={loanAmount}
                        onChange={handleLoanAmountChange}
                        aria-describedby={errors?.loanAmount ? "loan-amount-error" : undefined}
                        aria-invalid={Boolean(errors?.loanAmount)}
                    />
                    {errors?.loanAmount && (
                        <p id="loan-amount-error" className="text-red-500" aria-live="polite">{errors.loanAmount}</p>
                    )}
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="loan-term" className="text-sm font-medium text-gray-700">Loan term (years)</label>
                    <select
                        name="loan-term"
                        id="loan-term"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-white"
                        value={loanTerm}
                        onChange={handleLoanTermChange}
                        aria-describedby={errors?.loanTerm ? "loan-term-error" : undefined}
                        aria-invalid={Boolean(errors?.loanTerm)}
                    >
                        <option value={10}>10 years</option>
                        <option value={15}>15 years</option>
                        <option value={20}>20 years</option>
                        <option value={25}>25 years</option>
                        <option value={30}>30 years</option>
                    </select>
                    {errors?.loanTerm && (
                        <p id="loan-term-error" className="text-red-500" aria-live="polite">{errors.loanTerm}</p>
                    )}
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="interest-rate" className="text-sm font-medium text-gray-700">Interest rate (%)</label>
                    <input
                        type="number"
                        name="interest-rate"
                        id="interest-rate"
                        step="0.1"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                        placeholder="e.g. 3.5"
                        value={interestRate}
                        onChange={handleInterestChange}
                        aria-describedby={errors?.interestRate ? "interest-error" : undefined}
                        aria-invalid={Boolean(errors?.interestRate)}
                    />
                    {errors?.interestRate && (
                        <p id="interest-error" className="text-red-500" aria-live="polite">{errors.interestRate}</p>
                    )}
                </div>

                <button
                    type="submit"
                    className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md transition duration-200 shadow-md hover:shadow-lg mt-2 ${isCalculateDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={isCalculateDisabled}
                >
                    Calculate
                </button>
            </form>

            {/* Results */}
            <div aria-live="polite" className="flex flex-col items-center justify-center w-full md:w-1/2 bg-gray-50 rounded-lg p-8 border border-gray-100 self-stretch">
                <div className="text-lg font-semibold text-gray-600 mb-2">Monthly payment</div>
                <div className="text-4xl font-bold text-blue-600">
                    ${results.monthlyPayment?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
                <div className="text-lg font-semibold text-gray-600 mb-2">Total payment</div>
                <div className="text-4xl font-bold text-blue-600">
                    ${results.totalPayment?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
                <div className="text-lg font-semibold text-gray-600 mb-2">Total interest</div>
                <div className="text-4xl font-bold text-blue-600">
                    ${results.totalInterest?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
                <div className="mt-6 text-sm text-gray-500 text-center italic">
                    Estimate your monthly mortgage payments based on the loan amount, term, and interest rate.
                </div>
            </div>
        </div>
    )
}

export default MortgageCalculator;
