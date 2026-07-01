import "../../styles/modal.css";

// Modal reutilizable para formularios y confirmaciones
function Modal({ title, children, onClose }) {
    return (
        <div className="modal-overlay">
            <section className="modal-card">
                <div className="modal-header">
                    <h2>{title}</h2>

                    <button
                        className="modal-close"
                        onClick={onClose}
                    >
                        ×
                    </button>
                </div>

                <div className="modal-body">
                    {children}
                </div>
            </section>
        </div>
    );
}

export default Modal;