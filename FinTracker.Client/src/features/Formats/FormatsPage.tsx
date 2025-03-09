import { useState } from "react";
import { FieldValues } from "react-hook-form";
import Drawer from "../../components/Drawer";
import IconButton from "../../components/IconButton";
import Page from "../../components/Page";
import Row from "../../components/Row";
import StatusIndicator from "../../components/StatusIndicator";
import useGlobalDataCache from "../../hooks/useGlobalDataCache";
import ImportFormatService from "../../services/ImportFormatService";
import ImportFormat from "../../types/ImportFormat";
import ImportFormatViewModel from "../../types/ImportFormatViewModel";
import { blurActiveElement } from "../../utils/HtmlHelper";
import { AddFormatIcon } from "../../utils/Icons";
import ToastManager from "../../utils/ToastManager";
import FormatForm from "./FormatForm";
import FormatTable from "./FormatTable";
import ConfirmationPopup from "../../components/ConfirmationPopup";

function FormatsPage() {
    const globalDataCache = useGlobalDataCache();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);
    const [editingValues, setEditingValues] = useState<ImportFormatViewModel>();

    return (
        <Page>
            <Row justifyContent="space-between">
                <h1>Import Formats</h1>
                <div>
                    <IconButton
                        title="New format"
                        icon={AddFormatIcon}
                        onClick={newFormat}
                    />
                </div>
            </Row>

            {globalDataCache.importFormats.value ? (
                <FormatTable editFormat={editFormat} />
            ) : (
                <StatusIndicator status="loading" />
            )}

            <Drawer isOpen={isDrawerOpen} setIsOpen={setIsDrawerOpen}>
                <FormatForm
                    onCancel={() => setIsDrawerOpen(false)}
                    onDelete={() => setIsConfirmingDelete(true)}
                    onSubmit={submitFormat}
                    values={editingValues}
                />
            </Drawer>

            {isConfirmingDelete && (
                <ConfirmationPopup
                    onCancel={() => setIsConfirmingDelete(false)}
                    body={"Deleting an import format cannot be undone."}
                    onConfirm={deleteFormat}
                />
            )}
        </Page>
    );

    function newFormat() {
        setEditingValues({
            importFormatName: "",
            dateKey: "",
            memoKeys: "",
            amountKey: "",
            invertAmounts: "false",
            headerLines: "0",
            delimiter: ",",
            image: "",
        });
        setIsDrawerOpen(true);
    }
    function editFormat(format: ImportFormat) {
        setEditingValues({ ...format });
        setIsDrawerOpen(true);
    }
    function submitFormat(values: FieldValues) {
        const model: ImportFormatViewModel = {
            ...values,
            invertAmounts:
                values.invertAmounts?.toString().toLowerCase() === "true",
            headerLines:
                Number(values.headerLines?.toString() || NaN) ?? undefined,
        };

        (values.id
            ? ImportFormatService.putFormat(model)
            : ImportFormatService.createFormat(model)
        ).then(() => {
            blurActiveElement();
            globalDataCache.importFormats.refresh();
            setIsDrawerOpen(false);
            ToastManager.addToast({
                type: "success",
                title: "Success",
                body: "The import format was successfully saved.",
            });
        });
    }
    async function deleteFormat() {
        if (!editingValues?.id) return;
        await ImportFormatService.deleteFormat(editingValues.id);
        blurActiveElement();
        globalDataCache.importFormats.refresh();
        setIsConfirmingDelete(false);
        setIsDrawerOpen(false);
        ToastManager.addToast({
            type: "success",
            title: "Success",
            body: "The import format was successfully deleted.",
        });
    }
}

export default FormatsPage;
