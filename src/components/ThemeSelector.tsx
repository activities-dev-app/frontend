import { useTheme } from "@/context";
import Icon from "@/icons";

export default function ThemeSelector() {

    const { mode, setMode } = useTheme();

    return (
        <div className={`theme-selector theme-selector--${mode}`}>
            {
                mode === "dark" &&
                (
                    <button
                        onClick={() => setMode("light")}
                        className="button button__theme-selector theme-selector__button--light">
                        <Icon
                            icon="light-mode"
                            className="theme-selector__icon theme-selector__icon--light" />
                    </button>
                )
            }
            {
                mode === "light" &&
                (
                    <button
                        onClick={() => setMode("dark")}
                        className="button button__theme-selector theme-selector__button--dark">
                        <Icon
                            icon="dark-mode"
                            className="theme-selector__icon theme-selector__icon--dark" />
                    </button>
                )
            }
        </div>
    );
}