"use client";

import Modal from "./Modal";
import ModalButton from "./ModalButton";
import { useModal } from "@/context";

export default function Confirm() {

    const { 
        showConfirmDialog, 
        setShowConfirmDialog,
        message,
        confirm,
    } = useModal();

    if (!showConfirmDialog) return null;

    return (
        <Modal setShow={setShowConfirmDialog}>
            <div className="confirmDialog">
                <div className="confirmDialog__message">
                { message }
                </div>
                <div className="confirmDialog__buttons">
                    <ModalButton
                        buttonType="cancel"
                        onClick={() => {
                            confirm(false);
                            setShowConfirmDialog(false);
                        }}
                        label="Cancel"
                    />
                    <ModalButton
                        buttonType="confirm"
                        onClick={() => {
                            confirm(true);
                            setShowConfirmDialog(false);
                        }}
                        label="Confirm"
                    />
                </div>
            </div>
        </Modal>
    );
}