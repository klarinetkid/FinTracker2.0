import CategoryPill from "../../components/CategoryPill";
import EmptyTableMessage from "../../components/EmptyTableMessage";
import GroupedTable from "../../components/GroupedTable";
import GroupedTableRow from "../../components/GroupedTableRow";
import GroupedTableRowSet from "../../components/GroupedTableRowSet";
import Input from "../../components/Input";
import Category, { NeverImport, Uncategorized } from "../../types/Category";
import Grouping from "../../types/Grouping";
import Memo from "../../types/Memo";
import styles from "../../styles/MemoTable.module.css";

interface MemoTableProps {
    memos: Grouping<Category | undefined, Memo>[];
    editMemo: (memo: Memo) => void;
}

function MemoTable(props: MemoTableProps) {
    const { memos, editMemo } = props;

    return (
        <GroupedTable>
            <thead>
                <tr>
                    <th></th>
                    <th>Category</th>
                    <th className={styles.colMemo}>Memo</th>
                    <th className="nowidth"></th>
                </tr>
            </thead>
            {memos.map((grouping, groupIndex) => (
                <GroupedTableRowSet key={grouping.group?.id ?? -1}>
                    <GroupedTableRow
                        key={grouping.group?.id ?? -1}
                        rowIndex={0}
                    >
                        <td className="bold centre">{groupIndex + 1}</td>
                        <td className="centre">
                            <CategoryPill
                                category={grouping.group ?? NeverImport}
                            />
                        </td>
                        <td className="centre monospace bold">
                            ({grouping.items.length})
                        </td>
                    </GroupedTableRow>
                    {grouping.items.map((memo, i) => (
                        <GroupedTableRow key={memo.id} rowIndex={i + 1}>
                            <td></td>
                            <td className="centre">
                                <CategoryPill
                                    category={getDisplayCategory(memo)}
                                    onClick={() => editMemo(memo)}
                                />
                            </td>
                            <td
                                className="selectable"
                                onClick={() => editMemo(memo)}
                            >
                                <Input readOnly value={memo.memo} />
                            </td>
                        </GroupedTableRow>
                    ))}
                </GroupedTableRowSet>
            ))}

            {memos.length === 0 && <EmptyTableMessage />}
        </GroupedTable>
    );

    function getDisplayCategory(memo: Memo) {
        if (memo.category) return memo.category;
        return memo.isImported ? Uncategorized : NeverImport;
    }
}

export default MemoTable;
