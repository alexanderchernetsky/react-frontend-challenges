const CSSBattleLayout = () => {
    return (
        <div className="mt-8 w-full flex flex-col items-center justify-center">
            <div className="bg-[#FDFFE9] flex flex-col m-0 p-5 w-[400px] h-[300px] gap-3 border-[1px] border-gray-200">
                <header className="bg-[#ADB274] flex flex-row justify-between items-center p-1">
                    <div className="bg-[#555A2A] w-[21px] h-[21px]" />
                    <div className="bg-[#555A2A] w-[21px] h-[21px]" />
                </header>

                <div className="grid grid-cols-[100px_1fr] gap-3 flex-1">
                    <aside className="bg-[#ADB274]" />
                    <main className="grid grid-cols-1 grid-rows-[40px_1fr_1fr] gap-3">
                        <p className="bg-[#ADB274]" />
                        <p className="bg-[#ADB274]" />
                        <p className="bg-[#ADB274]" />
                    </main>
                </div>

                <footer className="bg-[#ADB274] flex flex-row justify-center items-center p-1">
                    <div className="flex flex-row items-center gap-3" >
                        <div className="bg-[#555A2A] w-[21px] h-[21px]" />
                        <div className="bg-[#555A2A] w-[21px] h-[21px]" />
                        <div className="bg-[#555A2A] w-[21px] h-[21px]" />
                    </div>
                </footer>
            </div>
        </div>
    )
}

export default CSSBattleLayout;
