import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFilePicker } from "use-file-picker";
import { SelectedFiles } from "use-file-picker/types";
import useGlobalDataCache from "../../hooks/useGlobalDataCache";
import ImportFileFormat from "../../types/ImportFileFormat";
import Pages from "../../types/Pages";
import MenuTile from "./MenuTile";

function ImportSubmenu() {
    const [selectedFormat, setSelectedFormat] = useState<ImportFileFormat>();
    const navigate = useNavigate();
    const globalDataCache = useGlobalDataCache();
    const { openFilePicker } = useFilePicker({
        accept: ".csv",
        onFilesSuccessfullySelected: (data: SelectedFiles<ArrayBuffer>) => {
            if (!selectedFormat) {
                console.log("no format");
                return;
            }
            const { filesContent } = data;
            navigate(Pages.Import, { state: { selectedFormat, filesContent } });
            setSelectedFormat(undefined);
        },
    });

    useEffect(() => {
        if (selectedFormat) openFilePicker();
    }, [selectedFormat]);

    return (
        <div className="menu-tile-container">
            {globalDataCache.importFileFormats.value.map((f, i) => (
                <MenuTile
                    key={i}
                    title={f.importFileFormatName}
                    iconPath={f.image ? "/format-icons/" + f.image : undefined}
                    onClick={() => selectFormat(f)}
                />
            ))}
        </div>
    );

    function selectFormat(format: ImportFileFormat) {
        setSelectedFormat(format);
    }
}

export default ImportSubmenu;
