import { createContext } from "react";

interface GroupedTableContextProps {
    isExpanded: boolean;
    setIsExpanded: (isExpanded: boolean) => void;
    showExpand: (rowIndex: number) => boolean;
}

export const GroupedTableContext = createContext<GroupedTableContextProps>({
    isExpanded: false,
    setIsExpanded: () => undefined,
    showExpand: () => false,
});
