import type { DrawingScheme } from "../types/DrawingScheme";

export function createBaseStarDrawer(params: {
    orbitSpeed?: number;
    rotationSpeed?: number;
    pathFn?: (
        time: number,
        i: number,
        count: number
    ) => { x: number; y: number };
    sizeFn?: (time: number, i: number, count: number) => number;
    hueFn?: (time: number, i: number, count: number) => number;
}): DrawingScheme["draw"] {
    const {
        orbitSpeed = 0.5,
        rotationSpeed = 4,
        pathFn,
        sizeFn,
        hueFn,
    } = params;

    return (ctx, width, height, _deltaTime, totalTime) => {
        ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
        ctx.fillRect(0, 0, width, height);

        const centerX = width / 2;
        const centerY = height / 2;
        const radius = Math.min(width, height) * 0.35;
        const starCount = 16;
        const baseSize = Math.min(width, height) * 0.04;
        const colorCycleSpeed = 0.5;
        const pulseSpeed = 0.5;

        const globalHueShift = (totalTime * colorCycleSpeed * 360) % 360;

        for (let i = 0; i < starCount; i++) {
            let x, y;
            if (pathFn) {
                const pos = pathFn(totalTime, i, starCount);
                x = centerX + pos.x * radius;
                y = centerY + pos.y * radius;
            } else {
                const angle =
                    (i / starCount) * Math.PI * 2 + totalTime * orbitSpeed;
                x = centerX + Math.cos(angle) * radius;
                y = centerY + Math.sin(angle) * radius;
            }

            const positionHue = (i / starCount) * 360;
            const pulseHue = (totalTime * pulseSpeed * 360) % 360;
            let combinedHue = (positionHue + pulseHue + globalHueShift) % 360;

            if (hueFn) {
                combinedHue = hueFn(totalTime, i, starCount);
            }

            const pulseFactor =
                0.5 + 0.5 * Math.sin(totalTime * pulseSpeed * Math.PI * 2);
            let starSize = baseSize * (0.8 + pulseFactor * 0.4);

            if (sizeFn) {
                starSize = sizeFn(totalTime, i, starCount);
            }

            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(
                totalTime * rotationSpeed + (i / starCount) * Math.PI * 2
            );

            ctx.fillStyle = `hsl(${combinedHue}, 100%, ${
                50 + pulseFactor * 20
            }%)`;
            drawStar(ctx, 0, 0, starSize * 0.4, starSize, 5);

            ctx.restore();
        }
    };
}

function drawStar(
    ctx: CanvasRenderingContext2D,
    cx: number,
    cy: number,
    innerRadius: number,
    outerRadius: number,
    points: number
) {
    let rot = (Math.PI / 2) * 3;
    let x = cx;
    let y = cy;
    const step = Math.PI / points;

    ctx.beginPath();
    ctx.moveTo(cx, cy - outerRadius);

    for (let i = 0; i < points; i++) {
        x = cx + Math.cos(rot) * outerRadius;
        y = cy + Math.sin(rot) * outerRadius;
        ctx.lineTo(x, y);
        rot += step;

        x = cx + Math.cos(rot) * innerRadius;
        y = cy + Math.sin(rot) * innerRadius;
        ctx.lineTo(x, y);
        rot += step;
    }

    ctx.lineTo(cx, cy - outerRadius);
    ctx.closePath();
    ctx.fill();
}
