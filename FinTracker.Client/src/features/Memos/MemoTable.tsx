import CategoryPill from "../../components/CategoryPill";
import GroupedTable from "../../components/GroupedTable";
import GroupedTableRow from "../../components/GroupedTableRow";
import GroupedTableRowSet from "../../components/GroupedTableRowSet";
import Input from "../../components/Input";
import Category, { NeverImport } from "../../types/Category";
import Grouping from "../../types/Grouping";
import Memo from "../../types/Memo";

interface MemoTableProps {
    memos: Grouping<Category | undefined, Memo>[];
    editMemo: (memo: Memo) => void;
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
            {props.memos.map((grouping, groupIndex) => (
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
                                <CategoryPill category={memo.category ?? NeverImport} />
                            </td>
                            <td>
                                <Input
                                    readOnly
                                    value={memo.memo}
                                    onClick={() => props.editMemo(memo)}
                                />
                            </td>
                        </GroupedTableRow>
                    ))}
                </GroupedTableRowSet>
            ))}
        </GroupedTable>
    );
}

export default MemoTable;
