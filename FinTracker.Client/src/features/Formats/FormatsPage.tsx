import { AxiosError } from "axios";
import { SyntheticEvent, useState } from "react";
import Drawer from "../../components/Drawer";
import IconButton from "../../components/IconButton";
import Page from "../../components/Page";
import Row from "../../components/Row";
import { useFormValues } from "../../hooks/useFormValues";
import useGlobalDataCache from "../../hooks/useGlobalDataCache";
import { ErrorResponse } from "../../services/BaseService";
import ImportFormatService from "../../services/ImportFormatService";
import ImportFormat from "../../types/ImportFormat";
import ImportFormatViewModel from "../../types/ImportFormatViewModel";
import { AddRoundLightFillIcon } from "../../utils/Icons";
import FormatForm from "./FormatForm";
import FormatTable from "./FormatTable";

function FormatsPage() {
    const globalDataCache = useGlobalDataCache();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const formValues = useFormValues<ImportFormatViewModel>({});

    return (
        <Page width={600}>
            <Row justifyContent="space-between">
                <h1>Import Formats</h1>
                <div>
                    <IconButton
                        title="New format"
                        icon={AddRoundLightFillIcon}
                        onClick={newFormat}
                    />
                </div>
            </Row>

            <FormatTable editFormat={editFormat} />

            <Drawer isOpen={isDrawerOpen} setIsOpen={setIsDrawerOpen}>
                <FormatForm
                    formValues={formValues}
                    onCancel={() => setIsDrawerOpen(false)}
                    onDelete={deleteFormat}
                    onSubmit={submitFormat}
                />
            </Drawer>
        </Page>
    );

    function newFormat() {
        formValues.setValues({});
        setIsDrawerOpen(true);
    }
    function editFormat(format: ImportFormat) {
        formValues.setValues(format);
        setIsDrawerOpen(true);
    }
    function submitFormat(event: SyntheticEvent) {
        event.preventDefault();

        const model: ImportFormatViewModel = {
            ...formValues.values,
            invertAmounts:
                formValues.values.invertAmounts?.toString().toLowerCase() ===
                "true",
            headerLines:
                Number(formValues.values.headerLines?.toString() || NaN) ??
                undefined,
        };

        (formValues.values.id
            ? ImportFormatService.createFormat(model)
            : ImportFormatService.putFormat(model)
        )
            .then(() => {
                if (event.target instanceof HTMLButtonElement)
                    event.target.blur();
                globalDataCache.importFormats.refresh();
                setIsDrawerOpen(false);
            })
            .catch((error: AxiosError<ErrorResponse>) => {
                formValues.setErrors(error.response?.data);
            });
    }
    async function deleteFormat() {
        if (!formValues.values.id) return;
        await ImportFormatService.deleteFormat(formValues.values.id);
        globalDataCache.importFormats.refresh();
        setIsDrawerOpen(false);
    }
}

export default FormatsPage;
