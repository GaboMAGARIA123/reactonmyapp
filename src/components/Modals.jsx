export const Modals = ({
  isOpen = false,
  title = "",
  children,
  onClose,
  containerclassName = "",
}) => {
  if (!isOpen) return null;

  const containerclass = `modal-container ${containerclassName}`.trim();

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className={containerclass} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">{title}</h2>
          <button className="modal-x" onClick={onClose} aria-label="Close modal">
            ✕
          </button>
        </div>

        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
};
