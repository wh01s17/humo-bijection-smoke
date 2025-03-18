declare module '@bijection/smoke' {
    interface SmokeMachine {
        start(): void;
        stop(): void;
        addSmoke(x: number, y: number, numberOfParticles?: number): void;
        step(milliseconds: number): void;
    }
    function SmokeMachine(context: CanvasRenderingContext2D, color?: [number, number, number]): SmokeMachine;
    export default SmokeMachine;
}
