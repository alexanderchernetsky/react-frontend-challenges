import {useEffect, useState} from "react";

const useIntersectionObserver = () => {
    const [isBottomReached, setIsBottomReached] = useState(false);

    useEffect(() => {
        const sentinel = document.querySelector('#bottomSentinel');
        if (!sentinel) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsBottomReached(entry.isIntersecting);
            },
            { root: null, threshold: 0.1 } // threshold can be small
        );

        observer.observe(sentinel);

        return () => observer.disconnect();
    }, []); // remove isBottomReached from dependencies

    return { isBottomReached };
};

export default useIntersectionObserver;
