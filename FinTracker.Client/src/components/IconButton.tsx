import "../styles/IconButton.css";

interface IconButtonProps {
    icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
    onClick?: () => void;
}

function IconButton(props: IconButtonProps) {
    //const navigate = useNavigate();

    return (
        <div className="icon-button">
            <props.icon onClick={props.onClick} width={32} height={32} />
        </div>
    );
}

export default IconButton;
