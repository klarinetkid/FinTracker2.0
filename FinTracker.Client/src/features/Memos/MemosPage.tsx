import { SyntheticEvent, useEffect, useState } from "react";
import Drawer from "../../components/Drawer";
import Page from "../../components/Page";
import Row from "../../components/Row";
import { useFormValues } from "../../hooks/useFormValues";
import MemoService from "../../services/MemoService";
import Category from "../../types/Category";
import Grouping from "../../types/Grouping";
import Memo from "../../types/Memo";
import MemoViewModel from "../../types/MemoViewModel";
import MemoForm from "./MemoForm";
import MemoTable from "./MemoTable";
import useRefresh from "../../hooks/useRefresh";
import StatusIndicator from "../../components/StatusIndicator";

function MemosPage() {
    const [groupedMemos, setGroupedMemos] =
        useState<Grouping<Category | undefined, Memo>[]>();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const { refreshed, refresh } = useRefresh();

    const formValues = useFormValues<MemoViewModel>({});

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
                    formValues={formValues}
                    onSubmit={submitMemo}
                    onCancel={() => setIsDrawerOpen(false)}
                    onDelete={deleteMemo}
                />
            </Drawer>
        </Page>
    );

    function editMemo(memo: MemoViewModel) {
        formValues.setValues(memo);
        setIsDrawerOpen(true);
    }
    async function submitMemo(event: SyntheticEvent) {
        event.preventDefault();

        await MemoService.patchCategorization(formValues.values);

        if (event.target instanceof HTMLButtonElement) event.target.blur();
        refresh();
        setIsDrawerOpen(false);
    }
    async function deleteMemo() {
        if (!formValues.values.id) return;
        await MemoService.deleteMemo(formValues.values.id);
        refresh();
        setIsDrawerOpen(false);
    }
}

export default MemosPage;
