import HolyGrail from "./HolyGrail/HolyGrail";

const HolyGrailPage = () => {
    return (
        <main className="flex flex-col items-center justify-center w-full p-[32px]">
            <h1 className="font-bold mb-8 text-2xl">Holy Grail Page</h1>
            <section className="w-full max-w-5xl">
                <HolyGrail />
            </section>
        </main>
    )
}

export default HolyGrailPage;
