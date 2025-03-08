import EmptyTableMessage from "../../components/EmptyTableMessage";
import Table from "../../components/Table";
import useGlobalDataCache from "../../hooks/useGlobalDataCache";
import ImportFormat from "../../types/ImportFormat";

interface FormatTableProps {
    editFormat: (format: ImportFormat) => void;
}

function FormatTable(props: FormatTableProps) {
    const { editFormat } = props;

    const globalDataCache = useGlobalDataCache();

    const formats = globalDataCache.importFormats.value ?? [];

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
                {formats.map((format, i) => (
                    <tr key={format.id}>
                        <td className="bold centre">{i + 1}</td>
                        <td
                            className="centre selectable"
                            onClick={() => editFormat(format)}
                        >
                            {format.importFormatName}
                        </td>
                        <td className="centre">
                            {format.image && (
                                <img
                                    src={`/format-icons/${format.image}`}
                                    height={30}
                                />
                            )}
                        </td>
                    </tr>
                ))}
            </tbody>

            {formats.length === 0 && <EmptyTableMessage />}
        </Table>
    );
}

export default FormatTable;
