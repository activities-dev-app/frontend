import Button from "../Button";

export default function FormButton({
    children,
    className,
    label,
    disabled,
    buttonType,
    onClick,
}: {
    children?: React.ReactNode;
    className?: string;
    label?: React.ReactNode;
    disabled?: boolean;
    buttonType: "submit" | "cancel";
    onClick?: () => void;
}) {

    return (
        <Button
            baseClassName="form-button"
            buttonName={buttonType}
            className={className}
            disabled={disabled}
            onClick={onClick}
        >
            {label ? label : children}
        </Button>
    );
}