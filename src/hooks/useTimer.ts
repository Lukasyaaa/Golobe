import { useEffect, useRef } from "react";

export const useInterval = (callback: () => void, delay: number, paused: boolean) => {
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

    useEffect(() => {
        if (paused) {
            if (timerRef.current !== null) {
                clearInterval(timerRef.current);
                timerRef.current = null;
            }
            return;
        }

        if (timerRef.current === null) {
            timerRef.current = setInterval(() => { callback() }, delay);
        }

        return () => {
            if (timerRef.current !== null) {
                clearInterval(timerRef.current);
                timerRef.current = null;
            }
        };
    }, [paused]);
}
