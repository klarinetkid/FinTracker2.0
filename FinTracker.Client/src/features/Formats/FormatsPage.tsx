import EntityManagementPage from "../../components/EntityManagementPage";
import useGlobalDataCache from "../../hooks/useGlobalDataCache";
import ImportFormatService from "../../services/ImportFormatService";
import ImportFormatViewModel from "../../types/ImportFormatViewModel";
import { AddFormatIcon } from "../../utils/Icons";
import FormatForm from "./FormatForm";
import FormatTable from "./FormatTable";

function FormatsPage() {
    const globalDataCache = useGlobalDataCache();

    const newFormatDefaults = {
        importFormatName: "",
        dateKey: "",
        memoKeys: "",
        amountKey: "",
        invertAmounts: "false",
        headerLines: "0",
        delimiter: ",",
        image: "",
    };

    return (
        <EntityManagementPage
            entityPluralName="Import Formats"
            entitySingularName="Import Format"
            newEntityDefaults={newFormatDefaults as ImportFormatViewModel}
            newEntityIcon={AddFormatIcon}
            getEntities={() => globalDataCache.importFormats.refresh()}
            addEntity={ImportFormatService.createFormat.bind(
                ImportFormatService
            )}
            putEntity={ImportFormatService.putFormat.bind(ImportFormatService)}
            deleteEntity={ImportFormatService.deleteFormat.bind(
                ImportFormatService
            )}
            renderTableOrLoading={(_, edit) => (
                <FormatTable editFormat={edit} />
            )}
            renderForm={(form) => <FormatForm form={form} />}
            transformBeforeSubmit={(values) => ({
                ...values,
                invertAmounts:
                    values.invertAmounts?.toString().toLowerCase() === "true",
                headerLines:
                    Number(values.headerLines?.toString() || NaN) ?? undefined,
            })}
        />
    );
}

export default FormatsPage;
