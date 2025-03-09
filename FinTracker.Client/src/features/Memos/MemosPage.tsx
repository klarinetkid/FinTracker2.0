import EntityManagementPage from "../../components/EntityManagementPage";
import StatusIndicator from "../../components/StatusIndicator";
import MemoService from "../../services/MemoService";
import Category from "../../types/Category";
import Grouping from "../../types/Grouping";
import Memo from "../../types/Memo";
import MemoViewModel from "../../types/MemoViewModel";
import MemoForm from "./MemoForm";
import MemoTable from "./MemoTable";

function MemosPage() {
    return (
        <EntityManagementPage
            title="Memos"
            entityName="Memo"
            getEntities={MemoService.getGrouped.bind(MemoService)}
            putEntity={MemoService.patchCategorization.bind(MemoService)}
            deleteEntity={MemoService.deleteMemo.bind(MemoService)}
            renderTable={renderTable}
            renderForm={(form) => <MemoForm form={form} />}
        />
    );

    function renderTable(
        memos: Grouping<Category | undefined, Memo>[] | undefined,
        edit: (e: MemoViewModel) => void
    ) {
        return memos ? (
            <MemoTable memos={memos} editMemo={edit} />
        ) : (
            <StatusIndicator status="loading" />
        );
    }
}

export default MemosPage;
