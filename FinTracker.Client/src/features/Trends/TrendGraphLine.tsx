import { createSearchParams } from "react-router-dom";
import tinycolor from "tinycolor2";
import styles from "../../styles/TrendGraphLine.module.css";
import Pages from "../../types/Pages";
import TrendLine from "../../types/TrendLine";
import TrendPoint from "../../types/TrendPoint";
import { classList } from "../../utils/HtmlHelper";
import { formatCurrency } from "../../utils/NumberHelper";
import TrendGraphPlotter from "../../utils/TrendGraphPlotter";
import { formatDateOnly } from "../../utils/DateHelper";

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
    const nonZeroCoords = coords.filter((c) => c.total !== 0);

    return (
        <g>
            <path
                stroke={lineColour}
                className={styles.valuePath}
                d={getPathValue(coords)}
            />
            {nonZeroCoords.map((point, i) => (
                <circle
                    key={i}
                    r={6}
                    cx={point.x}
                    cy={point.y}
                    className={classList(
                        styles.point,
                        point.isInverted ? styles.inverted : ""
                    )}
                />
            ))}
            {nonZeroCoords.map(drawPointLabel)}
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

    function drawPointLabel(point: PointCoordinate, i: number) {
        const grpClass = classList(
            styles.pointLabel,
            point.isInverted ? styles.inverted : ""
        );

        const txtLines = [
            line.category.categoryName,
            formatCurrency(point.total, false, true),
            formatDateOnly(point.start),
        ];

        const widthChars = Math.max(...txtLines.map((l) => l.length));
        const labelWidth = widthChars * 8 + 12;
        const labelHeight = txtLines.length * 30;

        const labelX = Math.min(
            point.x,
            graphPlotter.sizing.width - labelWidth / 2
        );
        const labelY = Math.max(point.y - labelHeight - 12, 0);

        return (
            <g key={i} className={grpClass}>
                <circle
                    r={8}
                    cx={point.x}
                    cy={point.y}
                    onClick={() => pointClick(point)}
                />
                <g
                    transform={`translate(${labelX} ${labelY})`}
                    className={styles.pointText}
                    onClick={() => pointClick(point)}
                >
                    <rect
                        x={-labelWidth / 2}
                        y={0}
                        width={labelWidth}
                        height={labelHeight}
                    />
                    {txtLines.map((txt, i) => (
                        <text
                            key={i}
                            x={0}
                            y={(labelHeight / txtLines.length) * (i + 1) - 9}
                        >
                            {txt}
                        </text>
                    ))}
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
