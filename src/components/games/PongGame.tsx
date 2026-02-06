"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";

export default function PongGame({ onClose }: { onClose: () => void }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [score, setScore] = useState([0, 0]); // [Player, AI]

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;

        // Game State
        const ball = { x: canvas.width / 2, y: canvas.height / 2, dx: 4, dy: 4, radius: 8 };
        const paddleHeight = 100;
        const paddleWidth = 10;
        const player = { x: 20, y: canvas.height / 2 - paddleHeight / 2, score: 0 };
        const ai = { x: canvas.width - 30, y: canvas.height / 2 - paddleHeight / 2, score: 0 };

        // Handle Resize
        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            // Reset positions
            ai.x = canvas.width - 30;
            if (ai.y > canvas.height - paddleHeight) ai.y = canvas.height - paddleHeight;
        };
        window.addEventListener('resize', resize);
        resize();

        // Controls
        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            const rootY = e.clientY - rect.top - paddleHeight / 2;
            player.y = Math.max(0, Math.min(canvas.height - paddleHeight, rootY));
        };
        canvas.addEventListener("mousemove", handleMouseMove);

        const update = () => {
            // Move Ball
            ball.x += ball.dx;
            ball.y += ball.dy;

            // Wall Collision (Top/Bottom)
            if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
                ball.dy *= -1;
            }

            // Paddle Collision (Player)
            if (
                ball.x - ball.radius < player.x + paddleWidth &&
                ball.y > player.y &&
                ball.y < player.y + paddleHeight
            ) {
                ball.dx = Math.abs(ball.dx) * 1.05; // Speed up
                ball.x = player.x + paddleWidth + ball.radius; // Push out to prevent sticking
            }

            // Paddle Collision (AI)
            if (
                ball.x + ball.radius > ai.x &&
                ball.y > ai.y &&
                ball.y < ai.y + paddleHeight
            ) {
                ball.dx = -Math.abs(ball.dx) * 1.05;
                ball.x = ai.x - ball.radius;
            }

            // AI Movement (Simple tracking with delay)
            const targetY = ball.y - paddleHeight / 2;
            const aiSpeed = 3.5;
            if (ai.y < targetY) ai.y += aiSpeed;
            if (ai.y > targetY) ai.y -= aiSpeed;
            // Bound AI
            ai.y = Math.max(0, Math.min(canvas.height - paddleHeight, ai.y));

            // Scoring
            if (ball.x < 0) {
                // AI Scores
                setScore(prev => [prev[0], prev[1] + 1]);
                resetBall();
            } else if (ball.x > canvas.width) {
                // Player Scores
                setScore(prev => [prev[0] + 1, prev[1]]);
                resetBall();
            }
        };

        const resetBall = () => {
            ball.x = canvas.width / 2;
            ball.y = canvas.height / 2;
            ball.dx = (Math.random() > 0.5 ? 4 : -4);
            ball.dy = (Math.random() > 0.5 ? 4 : -4);
        };

        const draw = () => {
            // Clear (Matrix Trail Effect)
            ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Draw Net
            ctx.setLineDash([10, 15]);
            ctx.beginPath();
            ctx.moveTo(canvas.width / 2, 0);
            ctx.lineTo(canvas.width / 2, canvas.height);
            ctx.strokeStyle = "#0F0";
            ctx.lineWidth = 2;
            ctx.stroke();

            // Draw Paddles
            ctx.fillStyle = "#0F0";
            ctx.shadowBlur = 15;
            ctx.shadowColor = "#0F0";
            ctx.fillRect(player.x, player.y, paddleWidth, paddleHeight);
            ctx.fillRect(ai.x, ai.y, paddleWidth, paddleHeight);

            // Draw Ball
            ctx.beginPath();
            ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowBlur = 0; // Reset for next frame
        };

        const loop = () => {
            update();
            draw();
            animationFrameId = requestAnimationFrame(loop);
        };

        loop();

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', resize);
            canvas.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black font-mono overflow-hidden cursor-none"
        >
            <div className="absolute top-8 left-0 right-0 flex justify-center gap-24 text-6xl font-bold text-green-500 select-none z-10 opacity-50">
                <div>{score[0]}</div>
                <div>{score[1]}</div>
            </div>

            <div className="absolute bottom-8 left-0 right-0 text-center text-green-500/50 text-sm select-none z-10">
                SYSTEM HACKED // PONG.EXE RUNNING...
            </div>

            <button
                onClick={onClose}
                className="absolute top-6 right-6 p-2 text-green-500 hover:text-white hover:bg-green-500/20 rounded-full transition-all z-20 cursor-pointer"
            >
                <X size={32} />
            </button>

            <canvas ref={canvasRef} className="block w-full h-full" />
        </motion.div>
    );
}
