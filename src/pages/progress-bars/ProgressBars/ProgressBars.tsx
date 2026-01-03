import React, {useEffect, useState} from "react";

// OBJECTIVE:
// Build an app where clicking the "Add" button adds progress bars to the page. The progress bars fill up gradually as soon as they are shown.
//
// Requirements:
// Clicking on the "Add" button adds a progress bar to the page.
// Each progress bar start filling up smoothly as soon as they're added
// Each bar takes approximately 2000ms to completely fill up.


// Notes:
// use setInterval
// set width as inline styles: style={{ width: `${progress}%` }}
const ProgressBar = React.memo(()=> {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setProgress(prev => prev < 100 ? prev + 0.5 : prev);
        }, 10);

        return () => {
            clearInterval(intervalId);
        }
    }, [])


    return (
        <div className="w-full max-w-[500px] h-[16px] bg-gray-200 rounded-full overflow-hidden border border-gray-300 shadow-inner">
            <div
                className="h-full bg-green-500"
                style={{ width: `${progress}%`, minWidth: progress > 0 ? '2px' : '0' }}
            />
        </div>
    )
});


const ProgressBars = () => {
    const [bars, setBars] = useState<{id: number}[]>([]);

    const handleAddBar = () => {
        setBars(prev => {
            return [...prev, { id: Date.now()}];
        });
    }

    return (
        <section className="flex flex-col items-center justify-center w-full gap-6">
            <div className="flex flex-col items-center gap-2">
                <label htmlFor="add-bar-button" className="text-sm font-medium text-gray-700">
                    Click the button to add progress bars
                </label>
                <button
                    id="add-bar-button"
                    onClick={handleAddBar}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-all active:scale-95"
                >
                    Add
                </button>
            </div>
            <div className="flex flex-col items-center gap-4 w-full">
                {bars.map((bar) => <ProgressBar key={bar.id} />)}
            </div>
        </section>
    )
}

export default ProgressBars;
