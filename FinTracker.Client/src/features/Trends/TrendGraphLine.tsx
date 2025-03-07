import tinycolor from "tinycolor2";
import styles from "../../styles/TrendGraphLine.module.css";
import TrendLine from "../../types/TrendLine";
import TrendPoint from "../../types/TrendPoint";
import { classList } from "../../utils/HtmlHelper";
import { formatCurrency } from "../../utils/NumberHelper";
import TrendGraphPlotter from "../../utils/TrendGraphPlotter";

interface TrendGraphLineProps {
    line: TrendLine;
    graphPlotter: TrendGraphPlotter;
}

interface PointCoordinate extends TrendPoint {
    x: number;
    y: number;
    isInverted: boolean;
}

function TrendGraphLine(props: TrendGraphLineProps) {
    const { line, graphPlotter } = props;

    const lineColour = tinycolor(line.category.colour).toHexString();
    const coords = line.points.map(getPointCoord);

    return (
        <g>
            <path
                stroke={lineColour}
                className={styles.valuePath}
                d={getPathValue(coords)}
            />
            <path
                stroke={lineColour}
                className={styles.inferredPath}
                d={getInferredPathValue(coords)}
            />
            {coords.filter((c) => c !== null).map(drawValuePoint)}
        </g>
    );

    function getPointCoord(point: TrendPoint, i: number) {
        if (point.plotValue === null) return null;
        return {
            ...point,
            x: graphPlotter.plotX(i),
            y: graphPlotter.plotY(point.plotValue),
            isInverted: point.total !== point.plotValue,
        } as PointCoordinate;
    }

    function getPathValue(coords: (PointCoordinate | null)[]) {
        const result = [];

        for (let i = 0; i < coords.length; i++) {
            const coord = coords[i];

            if (coord === null) continue;

            const move = i === 0 || coords[i - 1] === null ? "M" : "";
            result.push(move + coord.x + " " + coord.y);
        }

        return result.join(" ");
    }

    function getInferredPathValue(coords: (PointCoordinate | null)[]) {
        // start with first point where next value is null
        // find next non null point after that to connect them
        // if no point after, die
        const result = [];

        for (let i = 0; i < coords.length; i++) {
            const nextBeforeNull = coords.findIndex(
                (p, i2) => i2 >= i && p && !coords[i2 + 1]
            );

            if (nextBeforeNull < -1) break;

            const nextNullAfter = coords.findIndex(
                (p, i) => i > nextBeforeNull && p
            );

            if (nextNullAfter < -1) break;

            const from = coords[nextBeforeNull];
            const to = coords[nextNullAfter];
            if (!from || !to) continue;

            result.push("M" + from.x + " " + from.y + " " + to.x + " " + to.y);

            i = nextBeforeNull;
        }

        return result.join(" ");
    }

    function drawValuePoint(point: PointCoordinate, i: number) {
        const grpClass = classList(
            styles.pointValueGroup,
            point.isInverted ? styles.inverted : ""
        );

        const labelTransform = `translate(${point.x} ${point.y - 30})`;
        const amtLabel = formatCurrency(point.total, false, true);
        const widthChars = Math.max(
            amtLabel.length,
            line.category.categoryName.length
        );
        const labelWidth = widthChars * 8 + 12;
        const labelHeight = 44;

        return (
            <g key={i} className={grpClass}>
                <circle r={6} cx={point.x} cy={point.y} />
                <g transform={labelTransform} className={styles.valueLabel}>
                    <rect
                        className={styles.valueTxtBg}
                        x={-labelWidth / 2}
                        y={-labelHeight / 2}
                        width={labelWidth}
                        height={labelHeight}
                    />
                    <text x={0} y={0} alignmentBaseline="after-edge">
                        {line.category.categoryName}
                    </text>
                    <text x={0} y={0} alignmentBaseline="before-edge">
                        {formatCurrency(point.total, false, true)}
                    </text>
                </g>
            </g>
        );
    }
}

export default TrendGraphLine;
