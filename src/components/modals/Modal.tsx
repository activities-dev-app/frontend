import { useTheme } from "@/context";
import Icon from "@/icons";
import ModalButton from "./ModalButton";

export default function Modal({
    children,
    setShow,
    showCloseIcon = true,
    onDismiss,
    className,
}: {
    children: React.ReactNode;
    setShow?: React.Dispatch<React.SetStateAction<boolean>>,
    showCloseIcon?: boolean,
    onDismiss?: () => void,
    className?: string,
}) {

    const { mode } = useTheme();

    return (
        <div className={`modal-background modal-background--${mode}`}>
            <div className={className ?
                `modal modal--${mode} ${className}` :
                `modal modal--${mode}`}>
                <div className="modal__dismiss">
                    <ModalButton
                        buttonType="x"
                        onClick={() => {
                            onDismiss && onDismiss();
                            setShow && setShow(false);
                        }}>
                        { showCloseIcon && <Icon icon="x"/>}
                    </ModalButton>
                </div>
                {children}
            </div>
        </div>
    );
}