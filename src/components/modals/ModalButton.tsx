import { Mode } from "@/context/ThemeContext";
import Button from "../Button";

export default function ModalButton({
    children,
    className,
    label,
    disabled,
    buttonType,
    themeMode,
    onClick,
}: {
    children?: React.ReactNode;
    className?: string;
    label?: React.ReactNode;
    disabled?: boolean;
    buttonType: "confirm" | "cancel" | "x";
    themeMode?: Mode;
    onClick?: () => void;
}) {

    return (
        <Button
            baseClassName="modal-button"
            buttonName={buttonType}
            themeMode={themeMode}
            className={className}
            disabled={disabled}
            onClick={onClick}
        >
            {label ? label : children}
        </Button>
    );
}