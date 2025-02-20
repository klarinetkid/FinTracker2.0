import CategoryPill from "../../components/CategoryPill";
import GroupedTable from "../../components/GroupedTable";
import GroupedTableRow from "../../components/GroupedTableRow";
import GroupedTableRowSet from "../../components/GroupedTableRowSet";
import Input from "../../components/Input";
import MemoCategorization from "../../types/MemoCategorization";
import MemoCategorizationGroupViewModel from "../../types/models/MemoCategorizationGroupViewModel";

interface MemoTableProps {
    memos: MemoCategorizationGroupViewModel[];
    editMemo: (memo: MemoCategorization) => void;
}

function MemoTable(props: MemoTableProps) {
    return (
        <GroupedTable>
            <thead>
                <tr>
                    <th></th>
                    <th>Category</th>
                    <th style={{ width: "60%" }}>Memo</th>
                    <th style={{ width: 0 }}></th>
                </tr>
            </thead>
            {props.memos.map((group, groupIndex) => (
                <GroupedTableRowSet key={groupIndex}>
                    <GroupedTableRow key={-1} rowIndex={0}>
                        <td className="bold centre">{groupIndex + 1}</td>
                        <td className="centre">
                            <CategoryPill category={group.category} />(
                            {group.memoCategorizations.length})
                        </td>
                        <td></td>
                    </GroupedTableRow>
                    {group.memoCategorizations.map((memo, i) => (
                        <GroupedTableRow key={i} rowIndex={i + 1}>
                            <td></td>
                            <td className="centre">
                                <CategoryPill
                                    category={memo.category}
                                    onClick={() => props.editMemo(memo)}
                                />
                            </td>
                            <td>
                                <Input readOnly value={memo.memo} />
                            </td>
                        </GroupedTableRow>
                    ))}
                </GroupedTableRowSet>
            ))}
        </GroupedTable>
    );
}

export default MemoTable;
