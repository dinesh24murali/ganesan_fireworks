import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export class ConfirmModel {
  constructor(data) {
    let context = data;
    if (!data) context = {};
    this.onClose = context.onClose;
    this.text = context.text;
    this.isOpen = context.isOpen;
    this.title = context.title;
    this.showCancel = context.showCancel;
    this.positiveBtnText = context.positiveBtnText;
    this.negetiveBtnText = context.negetiveBtnText;
    this.escapeToClose = context.escapeToClose;
    this.clickOutsideToClose = context.clickOutsideToClose;
    this.hideHeader = context.hideHeader;
    this.centered = context.centered;
  }
}

export default function ConfirmModal({ config }) {
  const {
    onClose,
    text,
    isOpen,
    title,
    showCancel,
    positiveBtnText,
    negetiveBtnText,
    escapeToClose,
    clickOutsideToClose,
    hideHeader,
    centered,
  } = config;
  const handleClose = (value) => {
    onClose(value);
  };

  return (
    <Modal
      backdrop={clickOutsideToClose ? true : 'static'}
      keyboard={escapeToClose}
      isOpen={isOpen}
      toggle={() => handleClose(false)}
      centered={!!centered}
      size="lg"
    >
      {!hideHeader && (
        <ModalHeader toggle={() => handleClose(false)}>
          {title || ''}
        </ModalHeader>
      )}
      <ModalBody>{text}</ModalBody>
      <ModalFooter>
        {showCancel && (
          <button
            type="button"
            onClick={() => handleClose(false)}
            className="btn btn-outline-primary"
          >
            {negetiveBtnText || 'CANCEL'}
          </button>
        )}
        <button
          type="button"
          onClick={() => handleClose(true)}
          className="btn btn-primary"
        >
          {positiveBtnText || 'OK'}
        </button>
      </ModalFooter>
    </Modal>
  );
}
