import { useContext } from "react";
import { GroupedTableContext } from "../contexts/GroupedTableContext";
import IconButton from "./IconButton";
import { ExpandDownIcon, ExpandUpIcon } from "../utils/Icons";

interface GroupedTableRowProps
    extends React.HTMLAttributes<HTMLTableRowElement> {
    rowIndex: number;
    children?: React.ReactNode;
}
function GroupedTableRow(props: GroupedTableRowProps) {
    const { rowIndex, children, ...rest } = props;
    const groupedTable = useContext(GroupedTableContext);

    return (
        <tr {...rest}>
            {children}
            <td>
                {groupedTable.showExpand(rowIndex) && (
                    <IconButton
                        title={groupedTable.isExpanded ? "Hide" : "Show"}
                        icon={
                            groupedTable.isExpanded
                                ? ExpandUpIcon
                                : ExpandDownIcon
                        }
                        onClick={toggleExpand}
                    />
                )}
            </td>
        </tr>
    );

    function toggleExpand(event: React.MouseEvent<HTMLButtonElement>) {
        event.stopPropagation();
        groupedTable.setIsExpanded(!groupedTable.isExpanded);
    }
}

export default GroupedTableRow;
