import { createSearchParams } from "react-router-dom";
import tinycolor from "tinycolor2";
import styles from "../../styles/TrendGraphLine.module.css";
import Pages from "../../types/Pages";
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
            {coords.filter((c) => c.total !== 0).map(drawValuePoint)}
        </g>
    );

    function getPointCoord(point: TrendPoint, i: number) {
        return {
            ...point,
            x: graphPlotter.plotX(i),
            y: graphPlotter.plotY(point.plotValue),
            isInverted: point.total !== point.plotValue,
        } as PointCoordinate;
    }

    function getPathValue(coords: PointCoordinate[]) {
        return (
            "M" +
            coords
                .map((c) => [c.x, c.y])
                .flat()
                .join(" ")
        );
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
                <circle
                    r={6}
                    cx={point.x}
                    cy={point.y}
                    onClick={() => pointClick(point)}
                />
                <g transform={labelTransform} className={styles.valueLabel}>
                    <rect
                        className={styles.valueTxtBg}
                        x={-labelWidth / 2}
                        y={-labelHeight / 2}
                        width={labelWidth}
                        height={labelHeight}
                    />
                    <text x={0} y={-4}>
                        {line.category.categoryName}
                    </text>
                    <text x={0} y={labelHeight/2-6}>
                        {formatCurrency(point.total, false, true)}
                    </text>
                </g>
            </g>
        );
    }

    function pointClick(point: TrendPoint) {
        const search = createSearchParams({
            category: line.category.id.toString(),
            after: point.start,
            before: point.end,
        }).toString();

        window.open(Pages.Transactions + "?" + search);
    }
}

export default TrendGraphLine;
