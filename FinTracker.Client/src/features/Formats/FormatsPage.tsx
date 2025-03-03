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
import { AddFormatIcon } from "../../utils/Icons";
import FormatForm from "./FormatForm";
import FormatTable from "./FormatTable";

function FormatsPage() {
    const globalDataCache = useGlobalDataCache();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
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
                    onDelete={deleteFormat}
                    onSubmit={submitFormat}
                    values={editingValues}
                />
            </Drawer>
        </Page>
    );

    function newFormat() {
        setEditingValues({
            importFormatName: "",
            dateKey: "",
            memoFormat: "",
            amountKey: "",
            invertAmounts: "false",
            headerLines: "0",
            delimiter: ",",
            image: "",
        });
        setIsDrawerOpen(true);
    }
    function editFormat(format: ImportFormat) {
        setEditingValues(format);
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
            globalDataCache.importFormats.refresh();
            setIsDrawerOpen(false);
        });
    }
    async function deleteFormat() {
        if (!editingValues?.id) return;
        await ImportFormatService.deleteFormat(editingValues.id);
        globalDataCache.importFormats.refresh();
        setIsDrawerOpen(false);
    }
}

export default FormatsPage;
