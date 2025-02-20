import { useEffect, useState } from "react";
import MemoCategorizationService from "../../services/MemoCategorizationService";
import MemoCategorizationGroupViewModel from "../../types/models/MemoCategorizationGroupViewModel";
import Page from "../../components/Page";
import Row from "../../components/Row";
import MemoTable from "./MemoTable";
import Drawer from "../../components/Drawer";
import MemoForm from "./MemoForm";
import MemoCatgorizationViewModel from "../../types/models/MemoCategorizationViewModel";

function MemosPage() {
    const [groupedMemos, setGroupedMemos] = useState<MemoCategorizationGroupViewModel[]>([]);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isRefreshed, setIsRefreshed] = useState(false);

    //const [formValues, setFormValues, updateFormValues] =
    //    useFormValues<BudgetItemFormValues>(BudgetItemFormDefaults);

    useEffect(() => {
        MemoCategorizationService.getGrouped().then(setGroupedMemos);
    }, [isRefreshed]);

    return (
        <Page width={800}>
            <Row>
                <h1>Memos</h1>
            </Row>

            <MemoTable memos={groupedMemos} editMemo={editMemo} />

            <Drawer isOpen={isDrawerOpen} setIsOpen={setIsDrawerOpen}>
                <MemoForm />
            </Drawer>
        </Page>
    );

    function editMemo(memo: MemoCatgorizationViewModel) {
        //setFormValues(BudgetItemToFormValues(budgetItem));
        setIsDrawerOpen(true);
    }
    async function submitMemo(event: SyntheticEvent) {
        event.preventDefault();

        const model = {}; // BudgetFormValuesToModel(formValues);
        await MemoCategorizationService.patchCategorization(model);

        if (event.target instanceof HTMLButtonElement) event.target.blur();
        setIsRefreshed(!isRefreshed);
        setIsDrawerOpen(false);
    }
    async function deleteMemo() {
        //if (!formValues.categoryId) return;
        //await MemoCategorizationService.deleteCategorization(formValues.categoryId);
        setIsRefreshed(!isRefreshed);
        setIsDrawerOpen(false);
    }
}

export default MemosPage;
