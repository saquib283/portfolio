"use client";

import { useKonamiCode } from "@/hooks/useKonamiCode";
import { AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useSound } from "@/contexts/SoundContext";

const PongGame = dynamic(() => import("./PongGame"), { ssr: false });

export default function GameManager() {
    const { triggered, setTriggered } = useKonamiCode();
    const { playSuccess } = useSound();
    const [manualTrigger, setManualTrigger] = useState(false);

    useEffect(() => {
        const handleEvent = () => setManualTrigger(prev => !prev);
        window.addEventListener('toggle-game', handleEvent);
        return () => window.removeEventListener('toggle-game', handleEvent);
    }, []);

    useEffect(() => {
        if (triggered || manualTrigger) {
            playSuccess();
        }
    }, [triggered, manualTrigger, playSuccess]);

    return (
        <AnimatePresence>
            {(triggered || manualTrigger) && <PongGame onClose={() => {
                setTriggered(false);
                setManualTrigger(false);
            }} />}
        </AnimatePresence>
    );
}
