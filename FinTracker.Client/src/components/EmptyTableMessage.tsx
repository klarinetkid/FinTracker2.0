function EmptyTableMessage() {
    return (
        <tbody>
            <tr>
                <td colSpan={100} className="centre">
                    <h4>No items to show</h4>
                </td>
            </tr>
        </tbody>
    );
}

export default EmptyTableMessage;
