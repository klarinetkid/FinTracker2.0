import React, { Children, useState } from "react";
import { GroupedTableContext } from "../contexts/GroupedTableContext";
import styles from "../styles/GroupedTable.module.css";

interface GroupedTableRowSetProps {
    children?: React.ReactNode;
}

function GroupedTableRowSet(props: GroupedTableRowSetProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <GroupedTableContext.Provider
            value={{ isExpanded, setIsExpanded, showExpand }}
        >
            <tbody className={isExpanded ? styles.active : ""}>
                {props.children}
                <tr className={styles.spacerRow}></tr>
            </tbody>
        </GroupedTableContext.Provider>
    );

    function showExpand(rowNum: number): boolean {
        return rowNum === 0 && Children.count(props.children) > 1;
    }
}

export default GroupedTableRowSet;
