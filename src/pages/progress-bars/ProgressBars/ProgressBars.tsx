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
        <div className="w-[500px] h-[16px] bg-gray-100 flex flex-row">
            <div className={`h-[16px] bg-green-500`} style={{ width: `${progress}%` }} />
        </div>
    )
});


const ProgressBars = () => {
    const [bars, setBars] = useState<{id: number}[]>([]);

    const handleAddBar = () => {
        setBars(prev => {
            return [...prev, { id: prev.length + 1}];
        });
    }

    return (
        <section className="flex flex-col items-start justify-start w-full gap-4 min-w-[500px]">
            <button onClick={handleAddBar} className="border-[1px] border-black p-1 rounded-md">Add</button>
            <div className="flex flex-col justify-start gap-2">
                {bars.map((bar) => <ProgressBar key={bar.id} />)}
            </div>
        </section>
    )
}

export default ProgressBars;
