import ImportFileFormat from "../../types/ImportFileFormat";

interface FormatTableRowProps {
    format: ImportFileFormat;
    num: number;
    editFormat: (format: ImportFileFormat) => void;
}

function FormatTableRow(props: FormatTableRowProps) {
    return (
        <tr onClick={() => props.editFormat(props.format)}>
            <td className="bold centre">{props.num + 1}</td>
            <td className="category-table-name centre">
                {props.format.importFileFormatName}
            </td>
            <td className="centre">
                {!props.format.image ? (
                    ""
                ) : (
                    <img
                        src={`/public/format-icons/${props.format.image}`}
                        height={30}
                    />
                )}
            </td>
        </tr>
    );
}

export default FormatTableRow;
