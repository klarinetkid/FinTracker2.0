import Category from "./Category";
import TrendPoint from "./TrendPoint";

type TrendLine = {
    category: Category;
    points: TrendPoint[];
};

export default TrendLine;
