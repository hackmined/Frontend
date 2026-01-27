"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./CursorTrail.module.css";

interface Point {
    x: number;
    y: number;
    timestamp: number;
}

export default function CursorTrail() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const pointsRef = useRef<Point[]>([]);
    const animationFrameRef = useRef<number | undefined>(undefined);
    const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });

    const TRAIL_DURATION = 300; // Trail lasts 300ms
    const MIN_DISTANCE = 5; // Minimum distance between points to avoid clutter

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Set canvas size to window size
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resizeCanvas();

        // Track mouse position with timestamp
        const handleMouseMove = (e: MouseEvent) => {
            // Update cursor position for the custom cursor element
            setCursorPos({ x: e.clientX, y: e.clientY });

            const newPoint = {
                x: e.clientX,
                y: e.clientY,
                timestamp: Date.now(),
            };

            // Only add point if it's far enough from the last point
            const lastPoint = pointsRef.current[pointsRef.current.length - 1];
            if (!lastPoint) {
                pointsRef.current.push(newPoint);
                return;
            }

            const distance = Math.sqrt(
                Math.pow(newPoint.x - lastPoint.x, 2) + Math.pow(newPoint.y - lastPoint.y, 2)
            );

            if (distance >= MIN_DISTANCE) {
                pointsRef.current.push(newPoint);
            }
        };

        // Animation loop
        const animate = () => {
            if (!ctx || !canvas) return;

            // Clear canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const now = Date.now();
            const points = pointsRef.current;

            // Remove points older than TRAIL_DURATION
            pointsRef.current = points.filter(
                (point) => now - point.timestamp < TRAIL_DURATION
            );

            const filteredPoints = pointsRef.current;

            if (filteredPoints.length < 2) {
                animationFrameRef.current = requestAnimationFrame(animate);
                return;
            }

            // Draw smooth curved path with gradient opacity
            ctx.beginPath();
            ctx.lineWidth = 3;
            ctx.lineCap = "round";
            ctx.lineJoin = "round";

            // Start from first point
            ctx.moveTo(filteredPoints[0].x, filteredPoints[0].y);

            // Draw smooth curves through points
            for (let i = 1; i < filteredPoints.length - 1; i++) {
                const current = filteredPoints[i];
                const next = filteredPoints[i + 1];

                // Calculate age-based opacity (0 = oldest, 1 = newest)
                const age = now - current.timestamp;
                const progress = 1 - age / TRAIL_DURATION;
                const opacity = Math.pow(progress, 1.5); // Easing for smoother fade

                // Draw segment with calculated opacity
                ctx.strokeStyle = `rgba(255, 107, 53, ${opacity})`;

                // Use quadratic curve for smooth path
                const xc = (current.x + next.x) / 2;
                const yc = (current.y + next.y) / 2;
                ctx.quadraticCurveTo(current.x, current.y, xc, yc);
                ctx.stroke();

                // Start new path for next segment with different opacity
                ctx.beginPath();
                ctx.moveTo(xc, yc);
            }

            // Draw last segment
            if (filteredPoints.length > 1) {
                const lastPoint = filteredPoints[filteredPoints.length - 1];
                const age = now - lastPoint.timestamp;
                const progress = 1 - age / TRAIL_DURATION;
                const opacity = Math.pow(progress, 1.5);

                ctx.strokeStyle = `rgba(255, 107, 53, ${opacity})`;
                ctx.lineTo(lastPoint.x, lastPoint.y);
                ctx.stroke();
            }

            // Continue animation
            animationFrameRef.current = requestAnimationFrame(animate);
        };

        // Start animation
        animate();

        // Add event listeners
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("resize", resizeCanvas);

        // Cleanup
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("resize", resizeCanvas);
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, []);

    return (
        <>
            <canvas ref={canvasRef} className={styles.canvas} />
            <div
                className={styles.customCursor}
                style={{
                    left: `${cursorPos.x}px`,
                    top: `${cursorPos.y}px`,
                }}
            >
                <div className={styles.cursorDot}></div>
                <div className={styles.cursorCircle}></div>
            </div>
        </>
    );
}
