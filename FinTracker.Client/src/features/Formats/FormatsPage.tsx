import { useState } from "react";
import AddIcon from "../../assets/Add_round_fill_light.svg?react";
import Drawer from "../../components/Drawer";
import useFormValues from "../../hooks/useFormValues";
import useGlobalDataCache from "../../hooks/useGlobalDataCache";
import ImportFileFormatService from "../../services/ImportFileFormatService";
import ImportFileFormat from "../../types/ImportFileFormat";
import FormatForm, { FormatsFormValues } from "./FormatForm";
import FormatTable from "./FormatTable";

function FormatsPage() {

    const globalDataCache = useGlobalDataCache();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const [formValues, setFormValues, updateFormValues] =
        useFormValues<FormatsFormValues>({
            id: 0,
            importFileFormatName: "",
            dateKey: "",
            memoFormat: "",
            amountKey: "",
            invertAmounts: false,
            headerLines: 0,
            delimiter: "",
            image: "",
        });

    return (
        <div className="page" style={{ width: 600 }}>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <div></div>
                <h1>Import Formats</h1>
                <div>
                    <AddIcon width={36} height={36} onClick={newFormat} />
                </div>
            </div>

            <FormatTable editFormat={editFormat} />

            <Drawer isOpen={isDrawerOpen} setIsOpen={setIsDrawerOpen}>
                <FormatForm
                    formValues={formValues}
                    updateFormValues={updateFormValues}
                    onCancel={() => setIsDrawerOpen(false)}
                    onDelete={deleteFormat}
                    onSubmit={submitFormat}
                />
            </Drawer>
        </div>
    );

    function newFormat() {
        setFormValues({
            id: 0,
            importFileFormatName: "",
            dateKey: "",
            memoFormat: "",
            amountKey: "",
            invertAmounts: false,
            headerLines: 0,
            delimiter: "",
            image: "",
        });
        setIsDrawerOpen(true);
    }
    function editFormat(format: ImportFileFormat) {
        setFormValues(format);
        setIsDrawerOpen(true);
    }
    async function submitFormat(event) {
        event.preventDefault();

        if (formValues.id === 0) {
            await ImportFileFormatService.createFormat(formValues);
        } else {
            await ImportFileFormatService.putFormat(formValues);
        }

        globalDataCache.importFileFormats.refresh();
        setIsDrawerOpen(false);
        //return false;
    }
    async function deleteFormat() {
        await ImportFileFormatService.deleteFormat(formValues);
        globalDataCache.importFileFormats.refresh();
        setIsDrawerOpen(false);
    }
}

export default FormatsPage;
