import { useEffect, useState } from "react";
import { FieldValues } from "react-hook-form";
import Drawer from "../../components/Drawer";
import Page from "../../components/Page";
import Row from "../../components/Row";
import StatusIndicator from "../../components/StatusIndicator";
import useRefresh from "../../hooks/useRefresh";
import MemoService from "../../services/MemoService";
import Category from "../../types/Category";
import Grouping from "../../types/Grouping";
import Memo from "../../types/Memo";
import MemoViewModel from "../../types/MemoViewModel";
import { blurActiveElement } from "../../utils/HtmlHelper";
import ToastManager from "../../utils/ToastManager";
import MemoForm from "./MemoForm";
import MemoTable from "./MemoTable";

function MemosPage() {
    const [groupedMemos, setGroupedMemos] =
        useState<Grouping<Category | undefined, Memo>[]>();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const { refreshed, refresh } = useRefresh();
    const [editingValues, setEditingValues] = useState<MemoViewModel>();


    useEffect(() => {
        MemoService.getGrouped().then(setGroupedMemos);
    }, [refreshed]);

    return (
        <Page>
            <Row>
                <h1>Memos</h1>
            </Row>

            {groupedMemos ? (
                <MemoTable memos={groupedMemos} editMemo={editMemo} />
            ) : (
                <StatusIndicator status="loading" />
            )}

            <Drawer isOpen={isDrawerOpen} setIsOpen={setIsDrawerOpen}>
                <MemoForm
                    onSubmit={submitMemo}
                    onCancel={() => setIsDrawerOpen(false)}
                    onDelete={deleteMemo}
                    values={editingValues}
                />
            </Drawer>
        </Page>
    );

    function editMemo(memo: MemoViewModel) {
        setEditingValues(memo);
        setIsDrawerOpen(true);
    }
    async function submitMemo(model: FieldValues) {
        await MemoService.patchCategorization(model);
        blurActiveElement();
        refresh();
        setIsDrawerOpen(false);
        ToastManager.addToast({
            type: "success",
            title: "Success",
            body: "The memo was successfully saved.",
        });
    }
    async function deleteMemo() {
        if (!editingValues?.id) return;
        await MemoService.deleteMemo(editingValues.id);
        blurActiveElement();
        refresh();
        setIsDrawerOpen(false);
        ToastManager.addToast({
            type: "success",
            title: "Success",
            body: "The memo was successfully deleted.",
        });
    }
}

export default MemosPage;
