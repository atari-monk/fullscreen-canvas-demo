import { createBaseStarDrawer } from "./createBaseStarDrawer";
import type { DrawingScheme } from "../types/DrawingScheme";

export const drawingSchemes: DrawingScheme[] = [
    {
        name: "Pulsing Stars",
        draw: createBaseStarDrawer({
            sizeFn: (time, i, _count) => {
                const baseSize =
                    0.04 * Math.min(window.innerWidth, window.innerHeight);
                const pulseFactor = 0.5 + 0.5 * Math.sin(time * 2 + i * 0.3);
                return baseSize * (0.5 + pulseFactor * 0.8);
            },
        }),
    },
    {
        name: "Figure 8",
        draw: createBaseStarDrawer({
            pathFn: (time, i, count) => {
                const angle = (i / count) * Math.PI * 2 + time * 0.3;
                const x = Math.sin(angle) * 0.8;
                const y = Math.sin(angle * 2) * 0.6;
                return { x, y };
            },
        }),
    },
    {
        name: "Spiral",
        draw: createBaseStarDrawer({
            pathFn: (time, i, count) => {
                const progress = i / count + time * 0.1;
                const angle = progress * Math.PI * 2;
                const radius = 0.2 + (progress % 1) * 0.8;
                return {
                    x: Math.cos(angle) * radius,
                    y: Math.sin(angle) * radius,
                };
            },
        }),
    },
    {
        name: "Sine Wave",
        draw: createBaseStarDrawer({
            pathFn: (time, i, count) => {
                const x = -0.8 + (i / count) * 1.6;
                const y = Math.sin(time + i * 0.5) * 0.6;
                return { x, y };
            },
        }),
    },
    {
        name: "Radial Pulse",
        draw: createBaseStarDrawer({
            pathFn: (time, i, count) => {
                const angle = (i / count) * Math.PI * 2;
                const pulse = 0.5 + 0.5 * Math.sin(time * 1.5);
                return {
                    x: Math.cos(angle) * pulse,
                    y: Math.sin(angle) * pulse,
                };
            },
        }),
    },
    {
        name: "Color Cyclone",
        draw: createBaseStarDrawer({
            hueFn: (time, i, count) => {
                const positionHue = (i / count) * 360;
                const timeHue = (time * 200) % 360;
                return (positionHue + timeHue) % 360;
            },
            pathFn: (time, i, count) => {
                const angle = (i / count) * Math.PI * 2 + time * 2;
                const radius = 0.2 + 0.6 * ((i / count + time * 0.05) % 1);
                return {
                    x: Math.cos(angle) * radius,
                    y: Math.sin(angle) * radius,
                };
            },
        }),
    },
    {
        name: "Black Hole",
        draw: createBaseStarDrawer({
            pathFn: (time, i, count) => {
                const angle = (i / count) * Math.PI * 2;
                const spiral = (time * 0.2 + i / count) % 1;
                const eased = 1 - Math.pow(1 - spiral, 3);
                return {
                    x: Math.cos(angle) * eased,
                    y: Math.sin(angle) * eased,
                };
            },
            sizeFn: (time, i, count) => {
                const baseSize =
                    0.04 * Math.min(window.innerWidth, window.innerHeight);
                return (
                    baseSize *
                    (0.3 + 0.7 * (1 - ((time * 0.2 + i / count) % 1)))
                );
            },
        }),
    },
    {
        name: "Quantum Rings",
        draw: createBaseStarDrawer({
            pathFn: (time, i, _count) => {
                const ring = Math.floor(i / 4) + 1;
                const posInRing = i % 4;
                const angle =
                    (posInRing / 4) * Math.PI * 2 + time * (0.2 + ring * 0.1);
                const radius = 0.2 * ring;
                return {
                    x: Math.cos(angle) * radius,
                    y: Math.sin(angle) * radius,
                };
            },
            hueFn: (time, i, _count) => {
                return (time * 50 + i * 30) % 360;
            },
        }),
    },
    {
        name: "Chasing Comets",
        draw: createBaseStarDrawer({
            pathFn: (time, i, count) => {
                const chaseOffset = i / count;
                const angle = (time * 0.5 + chaseOffset) * Math.PI * 2;
                const radius = 0.3 + 0.5 * Math.sin(time + i * 0.2);
                return {
                    x: Math.cos(angle) * radius,
                    y: Math.sin(angle) * radius,
                };
            },
            sizeFn: (time, i, count) => {
                const baseSize =
                    0.04 * Math.min(window.innerWidth, window.innerHeight);
                const trail = 1 - ((time * 2 + i / count) % 1);
                return baseSize * (0.1 + trail * 0.9);
            },
        }),
    },
    {
        name: "Neural Network",
        draw: createBaseStarDrawer({
            pathFn: (time, i, count) => {
                const gridSize = Math.ceil(Math.sqrt(count));
                const col = i % gridSize;
                const row = Math.floor(i / gridSize);
                const xPos = -0.8 + (col / (gridSize - 1)) * 1.6;
                const yPos = -0.8 + (row / (gridSize - 1)) * 1.6;

                // Add subtle pulsing motion
                const pulseX = Math.sin(time * 0.3 + col * 0.5) * 0.1;
                const pulseY = Math.cos(time * 0.4 + row * 0.6) * 0.1;

                return {
                    x: xPos + pulseX,
                    y: yPos + pulseY,
                };
            },
            hueFn: (time, i, _count) => {
                return (time * 100 + i * 10) % 360;
            },
        }),
    },
    {
        name: "DNA Helix",
        draw: createBaseStarDrawer({
            pathFn: (time, i, count) => {
                const verticalPos = -0.7 + (i / count) * 1.4;
                const angle = time * 3 + verticalPos * 5;
                const radius = 0.4;
                const x = Math.sin(angle) * radius;
                const y = verticalPos;
                return { x, y };
            },
            sizeFn: (time, i, _count) => {
                const baseSize =
                    0.04 * Math.min(window.innerWidth, window.innerHeight);
                const pulse = 0.5 + 0.5 * Math.sin(time * 5 + i * 0.2);
                return baseSize * pulse;
            },
        }),
    },
    {
        name: "Magnetic Field",
        draw: createBaseStarDrawer({
            pathFn: (time, i, count) => {
                const angle = (i / count) * Math.PI * 2;
                const fieldDistortion = Math.sin(time + angle * 3) * 0.3;
                return {
                    x: Math.cos(angle) * (0.5 + fieldDistortion),
                    y: Math.sin(angle) * (0.5 - fieldDistortion),
                };
            },
            hueFn: (time, i, count) => {
                const angle = (i / count) * Math.PI * 2;
                return (Math.sin(time * 0.5 + angle) * 180 + 180) % 360;
            },
        }),
    },
    {
        name: "Particle Storm",
        draw: createBaseStarDrawer({
            pathFn: (time, i, _count) => {
                const speed = 0.5 + (i % 3) * 0.2;
                const angle = time * speed;
                const radius = 0.1 + ((i * 13) % 10) / 15;
                return {
                    x: Math.cos(angle) * radius * Math.sin(time * 0.3 + i),
                    y: Math.sin(angle) * radius * Math.cos(time * 0.4 + i),
                };
            },
            sizeFn: (time, i, _count) => {
                const baseSize =
                    0.04 * Math.min(window.innerWidth, window.innerHeight);
                return (
                    baseSize * (0.2 + 0.8 * Math.sin(time * 2 + i * 0.5) ** 2)
                );
            },
            hueFn: (time, i, _count) => {
                return (time * 120 + i * 15) % 360;
            },
        }),
    },
    {
        name: "Circular Orbit",
        draw: createBaseStarDrawer({
            orbitSpeed: 0.5,
        }),
    },
    {
        name: "Fractal Bloom",
        draw: createBaseStarDrawer({
            pathFn: (time, i, count) => {
                const branches = 5;
                const depth = 3;
                let angle = 0;
                let radius = 0;

                // Create fractal pattern
                for (let d = 0; d < depth; d++) {
                    const segment =
                        Math.floor(i / (count / branches ** (d + 1))) %
                        branches;
                    angle += segment * ((Math.PI * 2) / branches);
                    radius += 0.7 / (d + 1);
                }

                // Add animation
                const pulse = Math.sin(time * 0.5) * 0.2 + 0.8;
                angle += time * 0.2;

                return {
                    x: (Math.cos(angle) * radius * pulse) / depth,
                    y: (Math.sin(angle) * radius * pulse) / depth,
                };
            },
            sizeFn: (time, i, _count) => {
                const baseSize =
                    0.04 * Math.min(window.innerWidth, window.innerHeight);
                return baseSize * (0.3 + 0.7 * Math.sin(time * 3 + i * 0.1));
            },
        }),
    },
    {
        name: "Galactic Core",
        draw: createBaseStarDrawer({
            pathFn: (time, i, count) => {
                const spiral = (i / count + time * 0.05) % 1;
                const angle = spiral * Math.PI * 8;
                const radius = Math.pow(spiral, 2);
                return {
                    x: Math.cos(angle) * radius,
                    y: Math.sin(angle) * radius,
                };
            },
            sizeFn: (time, i, count) => {
                const baseSize =
                    0.04 * Math.min(window.innerWidth, window.innerHeight);
                return baseSize * (1 - ((i / count + time * 0.05) % 1));
            },
            hueFn: (time, i, count) => {
                return ((i / count) * 360 + time * 50) % 360;
            },
        }),
    },
    {
        name: "Time Dilation",
        draw: createBaseStarDrawer({
            pathFn: (time, i, count) => {
                const angle = (i / count) * Math.PI * 2;
                const timeWarp = Math.sin(time * 0.3 + angle) * 2;
                const radius = 0.3 + 0.4 * Math.sin(time * 0.1 + angle * 2);
                return {
                    x: Math.cos(angle + timeWarp) * radius,
                    y: Math.sin(angle + timeWarp) * radius,
                };
            },
            sizeFn: (time, i, count) => {
                const baseSize =
                    0.04 * Math.min(window.innerWidth, window.innerHeight);
                const angle = (i / count) * Math.PI * 2;
                const warp = Math.sin(time * 0.3 + angle);
                return baseSize * (0.5 + 0.5 * warp);
            },
            hueFn: (time, i, count) => {
                const angle = (i / count) * Math.PI * 2;
                return (time * 60 + (angle * 180) / Math.PI) % 360;
            },
        }),
    },
];
