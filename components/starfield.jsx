"use client";

import { useEffect, useRef } from "react";

export default function GalaxyBackground() {
    const canvasRef = useRef(null);
    const rafRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        let width = (canvas.width = window.innerWidth);
        let height = (canvas.height = window.innerHeight);

        const devicePixelRatio = window.devicePixelRatio || 1;
        canvas.width = width * devicePixelRatio;
        canvas.height = height * devicePixelRatio;
        ctx.scale(devicePixelRatio, devicePixelRatio);

        const starCount = width < 768 ? 100 : 200;
        const stars = Array.from({ length: starCount }, () => {
            const r = Math.floor(Math.random() * 150) + 100;
            const g = Math.floor(Math.random() * 150) + 100;
            const b = 255;
            return {
                x: Math.random() * width,
                y: Math.random() * height,
                size: Math.random() * 2 + 0.5,
                speed: Math.random() * 0.3 + 0.1,
                alpha: Math.random() * 0.8 + 0.2,
                color: [r, g, b],
            };
        });

        let gradient = ctx.createRadialGradient(
            width / 2,
            height / 2,
            0,
            width / 2,
            height / 2,
            width / 1.5,
        );
        gradient.addColorStop(0, "rgba(75, 0, 130, 0.08)");
        gradient.addColorStop(0.5, "rgba(0, 102, 204, 0.05)");
        gradient.addColorStop(1, "rgba(0,0,0,0)");

        function animate() {
            ctx.fillStyle = "rgba(0,0,0,0.03)";
            ctx.fillRect(0, 0, width, height);

            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, width, height);

            stars.forEach((star) => {
                star.y -= star.speed;
                if (star.y < 0) star.y = height;

                ctx.fillStyle = `rgba(${star.color[0]},${star.color[1]},${star.color[2]},${star.alpha})`;
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
                ctx.fill();
            });

            rafRef.current = requestAnimationFrame(animate);
        }

        animate();

        const handleResize = () => {
            width = canvas.width = window.innerWidth * devicePixelRatio;
            height = canvas.height = window.innerHeight * devicePixelRatio;
            ctx.setTransform(1, 0, 0, 1, 0, 0);
            ctx.scale(devicePixelRatio, devicePixelRatio);

            gradient = ctx.createRadialGradient(
                width / 2,
                height / 2,
                0,
                width / 2,
                height / 2,
                width / 1.5,
            );
            gradient.addColorStop(0, "rgba(75, 0, 130, 0.08)");
            gradient.addColorStop(0.5, "rgba(0, 102, 204, 0.05)");
            gradient.addColorStop(1, "rgba(0,0,0,0)");
        };

        window.addEventListener("resize", handleResize);
        return () => {
            cancelAnimationFrame(rafRef.current);
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed top-0 left-0 -z-10 h-full w-full"
        />
    );
}
