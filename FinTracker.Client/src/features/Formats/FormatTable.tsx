import EmptyTableMessage from "../../components/EmptyTableMessage";
import Table from "../../components/Table";
import useGlobalDataCache from "../../hooks/useGlobalDataCache";
import ImportFormat from "../../types/ImportFormat";

interface FormatTableProps {
    editFormat: (format: ImportFormat) => void;
}

function FormatTable(props: FormatTableProps) {
    const globalDataCache = useGlobalDataCache();

    return (
        <Table>
            <thead>
                <tr>
                    <th></th>
                    <th>Format Name</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {globalDataCache.importFormats.value.map((format, i) => (
                    <tr onClick={() => props.editFormat(format)}>
                        <td className="bold centre">{i + 1}</td>
                        <td className="centre">{format.importFormatName}</td>
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

            {globalDataCache.importFormats.value.length === 0 ? (
                <EmptyTableMessage />
            ) : (
                ""
            )}
        </Table>
    );
}

export default FormatTable;
