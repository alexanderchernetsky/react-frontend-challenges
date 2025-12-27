import MortgageCalculator from "./MortgageCalculator/MortgageCalculator";

const MortgageCalculatorPage = () => {
    return (
        <main className="flex flex-col items-center justify-center w-full p-[32px]">
            <h1 className="font-bold">Mortgage Calculator</h1>
            <section className="mt-[32px]">
                <MortgageCalculator />
            </section>
        </main>
    )
}

export default MortgageCalculatorPage;
