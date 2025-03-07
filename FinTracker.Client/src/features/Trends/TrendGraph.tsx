import styles from "../../styles/TrendGraph.module.css";
import TrendGraphSizing from "../../types/TrendGraphSizing";
import TrendLineCollection from "../../types/TrendLineCollection";
import { formatCurrency } from "../../utils/NumberHelper";
import TrendGraphPlotter from "../../utils/TrendGraphPlotter";
import TrendGraphLine from "./TrendGraphLine";

interface TrendGraphProps {
    trend: TrendLineCollection;
    sizing: TrendGraphSizing;
}

function TrendGraph(props: TrendGraphProps) {
    const { trend, sizing } = props;

    const snapTo = 25_00;

    const lbound =
        trend.lowerBound -
        (trend.lowerBound < 0 ? snapTo : 0) -
        (trend.lowerBound % snapTo);

    const maxUbound = (trend.upperBound + snapTo) * 1.25;
    const ubound = maxUbound - (maxUbound % snapTo);

    const numPoints = trend.lines[0].points.length - 1;

    const graphPlotter = new TrendGraphPlotter(
        sizing,
        lbound,
        ubound,
        numPoints
    );

    return (
        <svg
            width={sizing.width}
            height={sizing.height}
            viewBox={`0 0 ${sizing.width} ${sizing.height}`}
            className={styles.graph}
            preserveAspectRatio="none"
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
                    className={styles.axis}
                    strokeWidth={3}
                />
                <line
                    x1={sizing.yAxis}
                    x2={sizing.width}
                    y1={sizing.height - sizing.xAxis}
                    y2={sizing.height - sizing.xAxis}
                    className={styles.axis}
                    strokeWidth={3}
                />
                {graphPlotter.lowerBound <= 0 &&
                    graphPlotter.upperBound >= 0 && (
                        <line
                            x1={sizing.yAxis}
                            x2={sizing.width}
                            y1={graphPlotter.plotY(0)}
                            y2={graphPlotter.plotY(0)}
                            className={styles.zeroLine}
                            strokeWidth={1}
                        />
                    )}
            </>
        );
    }

    function verticalLines() {
        const result = [];

        const yBottom = sizing.height - sizing.xAxis;

        for (let i = 0; i < trend.lines[0].points.length; i++) {
            const x = graphPlotter.plotX(i);
            result.push(
                <g key={x}>
                    <text
                        x={x}
                        y={yBottom + 6}
                        textAnchor="end"
                        alignmentBaseline="text-before-edge"
                        transform-origin={`${x} ${yBottom + 6}`}
                        transform="rotate(-45)"
                        className={styles.legendTxt}
                    >
                        {trend.lines[0].points[i].start}
                    </text>
                    <line
                        key={i}
                        x1={x}
                        x2={x}
                        y1={0}
                        y2={yBottom}
                        className={styles.verticalGuide}
                        strokeWidth={0.75}
                    />
                </g>
            );
        }

        return result;
    }

    function horizontalLines() {
        const result = [];

        const numLines = 8;
        const amtPerLine = Math.abs(graphPlotter.boundDiff() / numLines);
        const inc = Math.max(amtPerLine - (amtPerLine % snapTo), snapTo);

        if (inc <= 0) console.error("inc <= 0");

        for (
            let i = graphPlotter.lowerBound;
            i <= graphPlotter.upperBound;
            i += inc
        ) {
            const y = graphPlotter.plotY(i);

            if (isNaN(y)) {
                console.log("nan");
            }

            result.push(
                <g key={y}>
                    <text
                        x={sizing.yAxis - 10}
                        y={y}
                        textAnchor="end"
                        alignmentBaseline="middle"
                        className={styles.legendTxt}
                    >
                        {formatCurrency(i, false, true)}
                    </text>
                    <line
                        key={i}
                        x1={sizing.yAxis}
                        x2={sizing.width}
                        y1={y}
                        y2={y}
                        className={styles.horizontalGuide}
                    />
                </g>
            );
        }
        return result;
    }
}

export default TrendGraph;
