import "../styles/IconButton.css";

interface IconButtonProps {
    icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

function IconButton(props: IconButtonProps) {
    return (
        <button className="icon-button" onClick={props.onClick}>
            <props.icon width={32} height={32} />
        </button>
    );
}

export default IconButton;
