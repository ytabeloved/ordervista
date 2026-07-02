import Modal from "./Modal";

// Modal reutilizable para confirmar acciones importantes
function ConfirmDialog({
    open,
    title,
    message,
    confirmText = "Confirmar",
    cancelText = "Cancelar",
    onConfirm,
    onCancel
}) {
    if (!open) {
        return null;
    }

    return (
        <Modal title={title} onClose={onCancel}>
            <p>{message}</p>

            <div className="form-actions">
                <button
                    type="button"
                    className="btn-secondary"
                    onClick={onCancel}
                >
                    {cancelText}
                </button>

                <button
                    type="button"
                    className="btn-danger"
                    onClick={onConfirm}
                >
                    {confirmText}
                </button>
            </div>
        </Modal>
    );
}

export default ConfirmDialog;