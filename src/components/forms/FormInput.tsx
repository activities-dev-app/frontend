"use client"
import { Mode } from "@/context/ThemeContext";
import { useRef } from "react";

export default function FormInput({
    id,
    label,
    value,
    setValue,
    validateInput,
    type = "text",
    placeholder,
    readOnly,
    autoFocus,
    error,
    setError,
    errorMessage,
    withDatalist,
    dataList,
    children,
    autoComplete = "off",
    size,
    mode,
}: {
    id: string;
    value: string;
    setValue: React.Dispatch<React.SetStateAction<string>>;
    validateInput?: (input: string) => void;
    label?: string;
    type?: React.HTMLInputTypeAttribute | undefined;
    placeholder?: string | undefined;
    readOnly?: boolean | undefined;
    autoFocus?: boolean | undefined;
    error?: string | null | boolean;
    setError?: React.Dispatch<React.SetStateAction<string | null | boolean>>;
    errorMessage?: string | boolean | null;
    withDatalist?: boolean;
    dataList?: () => JSX.Element[];
    children?: React.ReactNode;
    autoComplete?: React.HTMLInputAutoCompleteAttribute;
    size?: "small";
    mode?: Mode
}) {

    //const { mode } = useTheme();
    const iconsWrapperRef = useRef<HTMLDivElement>(null);

    return (
        <div className={size ?
            `form__input form__input--${size} form__input--${mode}` :
            `form__input form__input--${mode}`
        }>
            <label
                htmlFor={id}
                className={size ? 
                    `form__input__label form__input__label--${size} form__input__label--${mode}` :
                    `form__input__label form__input__label--${mode}`
                }>
                {label}
            </label>
            <div className="form__input__wrapper">
                <input
                    id={id}
                    list={`${id}-datalist`}
                    className={
                        error ?
                            (size ?
                                `form__input__input form__input__input--${size} form__input__input--${mode} form__input__input__error`: 
                                `form__input__input form__input__input--${mode} form__input__input__error`
                            ) :
                            (size ?
                                `form__input__input form__input__input--${size} form__input__input--${mode}`: 
                                `form__input__input form__input__input--${mode}`
                            )
                    }
                    style={children ? { paddingRight: 35 } : {}}
                    type={type}
                    placeholder={placeholder}
                    readOnly={readOnly}
                    autoFocus={autoFocus}
                    value={value}
                    onChange={e => {
                        setValue(e.target.value);
                        if (setError) {
                            if (e.target.value.length > 0) {
                                setError(false);
                            }
                        }
                    }}
                    onBlur={() => validateInput ? validateInput(value) : {}}
                    autoComplete={autoComplete}
                />
                <div
                    className="form__input__icons-wrapper"
                    ref={iconsWrapperRef}
                >
                    {children}
                </div>
            </div>
            {
                withDatalist &&
                <datalist id={`${id}-datalist`}>
                    {dataList && dataList()}
                </datalist>
            }
            {
                error &&
                <span className="form__input__error-message">
                    {errorMessage}
                </span>
            }
        </div>
    );
}