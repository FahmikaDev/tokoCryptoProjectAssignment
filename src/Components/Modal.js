import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";

class Modal extends Component {
    handleClickModalMask = e => {
        if (e) e.preventDefault();
        if (this.props.closeOnBackdrop && this.props.onClose) {
            this.props.onClose();
        }
    };

    handleClickModalContent = e => {
        if (e) e.stopPropagation();
    };

    handleEscapeKeydown = e => {
        if (e.keyCode == 27) {
            this.handleClickModalMask();
        }
    };

    componentDidMount() {
        document.addEventListener("keydown", this.handleEscapeKeydown, false);
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.handleEscapeKeydown);
    }

    render() {
        return (
            <div
                className="modal-mask"
                style={{ display: this.props.visible ? "" : "none" }}
                onClick={this.handleClickModalMask}
            >
                <div
                    className={`modal-dialog modal-${
                        this.props.size ? this.props.size : "md"
                    }`}
                >
                    <div
                        className="modal-content"
                        onClick={this.handleClickModalContent}
                    >
                        {this.props.children}
                    </div>
                </div>
                <style jsx>{`
                    .modal-mask {
                        position: fixed;
                        z-index: 9996;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        background-color: rgba(0, 0, 0, 0.2);
                        display: block;
                        -webkit-transition: opacity 0.3s ease-in-out;
                        -o-transition: opacity 0.3s ease-in-out;
                        transition: opacity 0.3s ease-in-out;
                        overflow-y: auto !important;
                    }
                    .modal-content {
                        border: 0px;
                        border-radius: 2px;
                        -webkit-transition: transform 0.3s ease-in-out;
                        -o-transition: transform 0.3s ease-in-out;
                        transition: transform 0.3s ease-in-out;
                    }
                `}</style>
            </div>
        );
    }
}

Modal.defaultProps = {
    closeOnBackdrop: true,
    visible: false
};

export default Modal;

export const FormModal = ({
    visible,
    onClose,
    onSubmit,
    title,
    children,
    size
}) => (
    <Modal visible={visible} onClose={onClose} size={size}>
        <form onSubmit={onSubmit}>
            {title ? (
                <div className="modal-header">
                    <h4>{title}</h4>
                </div>
            ) : null}
            <div className="modal-body">{children}</div>
            <div className="modal-footer">
                <button type="submit" className="btn btn-success">
                    Submit
                </button>&nbsp;
                <button
                    type="button"
                    className="btn btn-info"
                    onClick={onClose}
                >
                    Close
                </button>
            </div>
        </form>
    </Modal>
);
