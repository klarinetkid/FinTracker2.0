import tinycolor from "tinycolor2";
import TrendLine from "../../types/TrendLine";
import TrendPoint from "../../types/TrendPoint";
import { TrendGraphPlotter } from "./TrendGraph";

interface TrendGraphLineProps {
    line: TrendLine;
    graphPlotter: TrendGraphPlotter;
}

function TrendGraphLine(props: TrendGraphLineProps) {
    const { line, graphPlotter } = props;

    const coords = getCoords(line);

    return (
        <g>
            <path
                stroke={tinycolor(line.category.colour).toHexString()}
                strokeWidth={4}
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="#00000000"
                d={coords
                    .map(
                        (c, i, arr) =>
                            c !== null &&
                            (i === 0 || !arr[i - 1] ? "M" : "") +
                                c.x +
                                " " +
                                c.y
                    )
                    .join(" ")}
            />
            {coords
                .filter((p) => p !== null)
                .map((p, i) => (
                    <circle
                        key={i}
                        r={6}
                        cx={p.x}
                        cy={p.y}
                        stroke={p.plotValue === p.total ? "black" : "#880000"}
                        strokeWidth={2}
                        fill={p.plotValue === p.total ? "white" : "white"}
                    />
                ))}
        </g>
    );
    function getCoords(line: TrendLine) {
        return line.points.map(getPointCoords);

        function getPointCoords(point: TrendPoint, i: number) {
            if (point.plotValue === null) return null;
            return {
                ...point,
                x: graphPlotter.plotX(i),
                y: graphPlotter.plotY(point.plotValue),
            };
        }
    }
}

export default TrendGraphLine;
