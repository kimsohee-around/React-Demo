import './Modal.css'; // 모달 스타일

const Modal = ({ isOpen, children }) => {
    if (!isOpen) return null;
    //  아무것도 렌더링하지 않음

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                {children}
            </div>
        </div>
    );
};

export default Modal;
