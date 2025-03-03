import { useNavigate } from "react-router-dom";
import { useFilePicker } from "use-file-picker";
import { SelectedFiles } from "use-file-picker/types";
import { ImportParams } from "../../contexts/TransactionImportContext";
import useGlobalDataCache from "../../hooks/useGlobalDataCache";
import ImportFormat from "../../types/ImportFormat";
import Pages from "../../types/Pages";
import MenuTile from "./MenuTile";

function ImportSubmenu() {
    const navigate = useNavigate();
    const globalDataCache = useGlobalDataCache();
    const { openFilePicker } = useFilePicker({
        accept: ".csv",
        multiple: true,
        onFilesSuccessfullySelected: (data: SelectedFiles<ArrayBuffer>) => {
            if (!selectedFormat) return;
            const { filesContent } = data;

            const importParams: ImportParams = {
                format: selectedFormat,
                filesContent,
            };

            navigate(Pages.Import, { state: { importParams } });
        },
    });

    // need to use block scoped variable for this
    let selectedFormat: ImportFormat | undefined;

    return globalDataCache.importFormats.value.map((f, i) => (
        <MenuTile
            key={i}
            title={f.importFormatName}
            iconPath={f.image ? "/format-icons/" + f.image : undefined}
            onClick={() => selectFormat(f)}
        />
    ));

    function selectFormat(format: ImportFormat) {
        selectedFormat = format;
        openFilePicker();
    }
}

export default ImportSubmenu;
