import { useNavigate } from "react-router-dom";
import Back from "../assets/Back.svg?react";
import "../styles/BackButton.css";

function BackButton() {
    const navigate = useNavigate();

    return (
        <div className="back-button">
            <Back onClick={() => navigate(-1)} width={32} height={32} />
        </div>
    );
}

export default BackButton;
