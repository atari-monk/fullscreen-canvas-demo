export type DrawingScheme = {
    name: string;
    draw: (
        ctx: CanvasRenderingContext2D,
        width: number,
        height: number,
        deltaTime: number,
        totalTime: number
    ) => void;
};
