interface SpacerProps {
    height: number;
}

function Spacer(props: SpacerProps) {
    return <div style={{ height: props.height + "px" }}></div>;
}

export default Spacer;
