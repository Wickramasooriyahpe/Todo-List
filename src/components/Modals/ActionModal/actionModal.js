import React from "react";
import CustomButton from "../../Button/button";
import "./actionModal.css";

const ActionModal = ({
  title,
  message,
  button1Config,
  button2Config,
}) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-content__body">
          <div className="modal-content__header">{title}</div>
          <div className="modal-content__message">
            {message}
          </div>
          <div className="modal-actions">
          <div className="modal-actions__secondry">
            <CustomButton
              className={button1Config.className}
              text={button1Config.text}
              onClick={button1Config.onClick}
            />
            </div>
            <div className="modal-actions__primary">
            <CustomButton
              className={button2Config.className}
              text={button2Config.text}
              onClick={button2Config.onClick}
            />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActionModal;
