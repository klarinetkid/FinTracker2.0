import TrendGraphSizing from "../types/TrendGraphSizing";

export default class TrendGraphPlotter {
    public sizing: TrendGraphSizing;
    public lowerBound: number;
    public upperBound: number;
    public numPoints: number;

    public boundDiff() {
        return this.upperBound - this.lowerBound;
    }
    constructor(
        sizing: TrendGraphSizing,
        lowerBound: number,
        upperBound: number,
        numPoints: number
    ) {
        this.sizing = sizing;
        this.lowerBound = lowerBound;
        this.upperBound = upperBound;
        this.numPoints = numPoints;

        if (this.lowerBound >= this.upperBound)
            console.error("lowerBound >= upperBound");
    }

    public plotY(value: number): number {
        const yAxisHeight =
            this.sizing.height - this.sizing.xAxis - this.sizing.padding;

        const ratio =
            (value - this.lowerBound) / (this.upperBound - this.lowerBound);

        return this.sizing.padding + yAxisHeight - ratio * yAxisHeight;
    }

    public plotX(value: number): number {
        const xAxisWidth =
            this.sizing.width - this.sizing.yAxis - this.sizing.padding;

        return (xAxisWidth / this.numPoints) * value + this.sizing.yAxis;
    }
}
