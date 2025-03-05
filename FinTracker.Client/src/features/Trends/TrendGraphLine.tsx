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
                    .map((c, i, arr) =>
                        c === null
                            ? null
                            : (i === 0 || !arr[i - 1] ? "M" : "") + c.join(" ")
                    )
                    .join(" ")}
            />
            {coords
                .filter((p) => p !== null)
                .map((p, i) => (
                    <circle
                        key={i}
                        r={6}
                        cx={p[0]}
                        cy={p[1]}
                        stroke="black"
                        strokeWidth={2}
                        fill="#fff"
                    />
                ))}
        </g>
    );
    function getCoords(line: TrendLine): (number[] | null)[] {
        return line.points.map(getPointCoords);

        function getPointCoords(p: TrendPoint, i: number) {
            if (p.total === null) return null;
            return [graphPlotter.plotX(i), graphPlotter.plotY(p.total)];
        }
    }
}

export default TrendGraphLine;
