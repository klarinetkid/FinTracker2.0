interface EmptyTableMessageProps {
    message?: string;
}

function EmptyTableMessage(props: EmptyTableMessageProps) {
    const { message } = props;

    return (
        <tbody>
            <tr>
                <td colSpan={100} className="centre">
                    <h4>{message ?? "No data"}</h4>
                </td>
            </tr>
        </tbody>
    );
}

export default EmptyTableMessage;
