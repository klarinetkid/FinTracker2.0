import useGlobalDataCache from "../../hooks/useGlobalDataCache";
import ImportFileFormat from "../../types/ImportFileFormat";
import FormatTableRow from "./FormatTableRow";

interface FormatTableProps {
    editFormat: (format: ImportFileFormat) => void;
}

function FormatTable(props: FormatTableProps) {

    const globalDataCache = useGlobalDataCache();

    return (
        <div className="table-holder">
            <table className="table">
                <thead>
                    <tr>
                        <th></th>
                        <th>Format Name</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {globalDataCache.importFileFormats.value.map((f, i) => (
                        <FormatTableRow
                            key={i}
                            format={f}
                            num={i}
                            editFormat={props.editFormat}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default FormatTable;
