import { SyntheticEvent, useState } from "react";
import AddIcon from "../../assets/Add_round_fill_light.svg?react";
import Drawer from "../../components/Drawer";
import useFormValues from "../../hooks/useFormValues";
import useGlobalDataCache from "../../hooks/useGlobalDataCache";
import ImportFileFormatService from "../../services/ImportFileFormatService";
import ImportFileFormat from "../../types/ImportFileFormat";
import FormatForm from "./FormatForm";
import FormatTable from "./FormatTable";
import IconButton from "../../components/IconButton";
import FormatFormValues, {
    FormatFormDefaults,
    FormatFormValuesToModel,
    ImportFileFormatToFormValues,
} from "../../types/forms/ImportFileFormatFormValues";

function FormatsPage() {
    const globalDataCache = useGlobalDataCache();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const [formValues, setFormValues, updateFormValues] =
        useFormValues<FormatFormValues>(FormatFormDefaults);

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
                    <IconButton icon={AddIcon} onClick={newFormat} />
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
        setFormValues(FormatFormDefaults);
        setIsDrawerOpen(true);
    }
    function editFormat(format: ImportFileFormat) {
        setFormValues(ImportFileFormatToFormValues(format));
        setIsDrawerOpen(true);
    }
    async function submitFormat(event: SyntheticEvent) {
        event.preventDefault();

        const model = FormatFormValuesToModel(formValues);

        if (formValues.id === 0) {
            await ImportFileFormatService.createFormat(model);
        } else {
            await ImportFileFormatService.putFormat(model);
        }

        globalDataCache.importFileFormats.refresh();
        setIsDrawerOpen(false);
        //return false;
    }
    async function deleteFormat() {
        await ImportFileFormatService.deleteFormat(formValues.id);
        globalDataCache.importFileFormats.refresh();
        setIsDrawerOpen(false);
    }
}

export default FormatsPage;
