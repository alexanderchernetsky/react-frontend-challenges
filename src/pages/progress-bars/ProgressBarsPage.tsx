import ProgressBars from "./ProgressBars/ProgressBars";

const ProgressBarsPage = () => {
    return (
        <main className="flex flex-col items-center justify-center w-full p-[32px]">
            <h1 className="font-bold">Progress Bars Page</h1>
            <section className="mt-[32px]">
                <ProgressBars />
            </section>
        </main>
    )
}

export default ProgressBarsPage;
