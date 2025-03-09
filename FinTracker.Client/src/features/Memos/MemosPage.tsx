import EntityManagementPage from "../../components/EntityManagementPage";
import MemoService from "../../services/MemoService";
import Category from "../../types/Category";
import Grouping from "../../types/Grouping";
import Memo from "../../types/Memo";
import MemoForm from "./MemoForm";
import MemoTable from "./MemoTable";

function MemosPage() {
    return (
        <EntityManagementPage
            entityPluralName="Memos"
            entitySingularName="Memo"
            getEntities={MemoService.getGrouped.bind(MemoService)}
            putEntity={MemoService.patchCategorization.bind(MemoService)}
            deleteEntity={MemoService.deleteMemo.bind(MemoService)}
            renderTableOrLoading={(
                memos: Grouping<Category | undefined, Memo>[],
                edit
            ) => <MemoTable memos={memos} editMemo={edit} />}
            renderForm={(form) => <MemoForm form={form} />}
        />
    );
}

export default MemosPage;
