interface SpacerProps {
    height: number;
}

function Spacer({ height }: SpacerProps) {
    return <div style={{ height }}></div>;
}

export default Spacer;
