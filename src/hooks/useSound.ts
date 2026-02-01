import { useCallback } from 'react';

const useSound = (src: string) => {
    const play = useCallback(() => {
        try {
            const audio = new Audio(src);
            audio.volume = 0.2; // Keep it subtle
            audio.play();
        } catch (error) {
            console.warn("Audio play failed", error);
        }
    }, [src]);

    return [play];
};

export default useSound;
