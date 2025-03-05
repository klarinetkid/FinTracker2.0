import TrendLineCollection from "../../types/TrendLineCollection";
import { formatCurrency } from "../../utils/NumberHelper";
import TrendGraphLine from "./TrendGraphLine";

export type TrendGraphSizing = {
    width: number;
    height: number;
    xAxis: number;
    yAxis: number;
};

export class TrendGraphPlotter {
    public sizing: TrendGraphSizing;
    public lowerBound: number;
    public upperBound: number;
    public numPoints: number;

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
    }

    public plotY(value: number): number {
        const yAxisHeight = this.sizing.height - this.sizing.xAxis;
        const ratio =
            (value - this.lowerBound) / (this.upperBound - this.lowerBound);

        return yAxisHeight - ratio * yAxisHeight;
    }

    public plotX(value: number): number {
        const xAxisWidth = this.sizing.width - this.sizing.yAxis;

        return (xAxisWidth / this.numPoints) * value + this.sizing.yAxis;
    }
}

interface TrendGraphProps {
    trend: TrendLineCollection;
    sizing: TrendGraphSizing;
}

function TrendGraph(props: TrendGraphProps) {
    const { trend, sizing } = props;

    const snapTo = 500;

    // TODO: if all values <= 0, invert the graph
    // otherwise use actual bounds
    const truLower = Math.min(
        Math.abs(trend.upperBound),
        Math.abs(trend.lowerBound)
    );
    const _truLower = truLower - (truLower % snapTo);
    const truUpper =
        Math.max(Math.abs(trend.upperBound), Math.abs(trend.lowerBound)) *
        1.025;
    const _truUpper = truUpper + snapTo - (truUpper % snapTo);

    const numPoints = trend.lines[0].points.length - 1;

    // TODO: use memo
    const graphPlotter = new TrendGraphPlotter(
        sizing,
        _truLower,
        _truUpper,
        numPoints
    );

    return (
        <svg
            width={sizing.width}
            height={sizing.height}
            viewBox={`0 0 ${sizing.width} ${sizing.height}`}
            style={{ border: "solid black 1px" }}
            preserveAspectRatio="meet"
        >
            {verticalLines()}
            {horizontalLines()}
            {axes()}

            {trend.lines.map((line, i) => (
                <TrendGraphLine
                    key={i}
                    line={line}
                    graphPlotter={graphPlotter}
                />
            ))}
        </svg>
    );

    function axes() {
        return (
            <>
                <line
                    x1={sizing.yAxis}
                    x2={sizing.yAxis}
                    y1={0}
                    y2={sizing.height - sizing.xAxis}
                    stroke="black"
                    strokeWidth={3}
                />
                <line
                    x1={sizing.yAxis}
                    x2={sizing.width}
                    y1={sizing.height - sizing.xAxis}
                    y2={sizing.height - sizing.xAxis}
                    stroke="black"
                    strokeWidth={3}
                />
            </>
        );
    }

    function verticalLines() {
        const result = [];

        const yBottom = sizing.height - sizing.xAxis;

        for (const i in trend.lines[0].points) {
            const x = graphPlotter.plotX(i);
            result.push(
                <g>
                    <text
                        x={x}
                        y={yBottom + 6}
                        textAnchor="end"
                        alignmentBaseline="text-before-edge"
                        transform-origin={`${x} ${yBottom + 6}`}
                        transform="rotate(-45)"
                        fontSize="12px"
                        fill="#666666"
                    >
                        {trend.lines[0].points[i].start}
                    </text>
                    <line
                        key={i}
                        x1={x}
                        x2={x}
                        y1={0}
                        y2={yBottom}
                        stroke="#eeeeee"
                        strokeWidth={2}
                    />
                </g>
            );
        }

        return result;
    }

    function horizontalLines() {
        const result = [];

        const numLines = 8;
        const inc =
            graphPlotter.upperBound / numLines -
            ((graphPlotter.upperBound / numLines) % 500);

        for (
            let i = graphPlotter.lowerBound;
            i <= graphPlotter.upperBound;
            i += inc
        ) {
            const y = graphPlotter.plotY(i);
            result.push(
                <g>
                    <text
                        x={sizing.yAxis - 10}
                        y={y}
                        textAnchor="end"
                        alignmentBaseline="middle"
                        fontSize="12px"
                        fill="#666666"
                    >
                        {formatCurrency(i)}
                    </text>
                    <line
                        key={i}
                        x1={sizing.yAxis}
                        x2={sizing.width}
                        y1={y}
                        y2={y}
                        stroke="#eeeeee"
                        strokeWidth={2}
                    />
                </g>
            );
        }
        return result;
    }
}

export default TrendGraph;
