import { Mode } from "@/context/ThemeContext";

export default function Button({
    children,
    className,
    label,
    disabled,
    buttonName,
    themeMode,
    baseClassName,
    onClick,
}: {
    children?: React.ReactNode;
    className?: string;
    label?: React.ReactNode;
    disabled?: boolean;
    buttonName?: string;
    themeMode?: Mode;
    baseClassName?: string;
    onClick?: () => void;
}) {

    let buttonBaseClassName = buttonName ?
        (
            baseClassName ?
                `button ${baseClassName} ${baseClassName}__${buttonName}` :
                `button button__${buttonName}`
        ) : (
            baseClassName ?
                `button ${baseClassName}` :
                "button"
        );

    let buttonClassName = buttonBaseClassName;

    const buttonClassNameWithThemes = () => {
        if (themeMode) {
            return `${buttonClassName} ${buttonBaseClassName.split(" ").reverse()[0]}--${themeMode}`;
        } else {
            return buttonClassName;
        }
    }

    buttonClassName = buttonClassNameWithThemes();

    buttonClassName += className ? ` ${className}` : "";

    return (
        <button
            className={buttonClassName}
            disabled={disabled}
            onClick={onClick}
        >
            {label ? label : children}
        </button>
    );
}