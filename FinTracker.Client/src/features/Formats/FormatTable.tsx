import Table from "../../components/Table";
import useGlobalDataCache from "../../hooks/useGlobalDataCache";
import ImportFileFormat from "../../types/ImportFileFormat";

interface FormatTableProps {
    editFormat: (format: ImportFileFormat) => void;
}

function FormatTable(props: FormatTableProps) {
    const globalDataCache = useGlobalDataCache();

    return (
        <Table selectable={true}>
            <thead>
                <tr>
                    <th></th>
                    <th>Format Name</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {globalDataCache.importFileFormats.value.map((format, i) => (
                    <tr onClick={() => props.editFormat(format)}>
                        <td className="bold centre">{i + 1}</td>
                        <td className="centre">
                            {format.importFileFormatName}
                        </td>
                        <td className="centre">
                            {!format.image ? (
                                ""
                            ) : (
                                <img
                                    src={`/public/format-icons/${format.image}`}
                                    height={30}
                                />
                            )}
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
}

export default FormatTable;
