import { useContext } from "react";
import { CategorySelectionContext } from "../contexts/CategorySelectionContext";

export default function useCategorySelection() {
    return useContext(CategorySelectionContext);
}
