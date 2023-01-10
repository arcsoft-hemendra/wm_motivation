import React from "react";
import "./CloseBtn.css";
import { useHistory } from "react-router-dom";

const CloseBtn = ({locationType}) => {
  const history = useHistory();
  const goBack = () => {
    history.push(locationType)
  };
  

  return (
    <div className="waveBtn">
      <i
        role="button"
        tabIndex="0"
        onKeyDown={goBack}
        onClick={goBack}
        className={`btnClose icon icon-cancel`}
      />
      <div
        role="button"
        tabIndex="0"
        onKeyDown={goBack}
        onClick={goBack}
        className="closeBtnWave"
      >
        &nbsp;
      </div>
    </div>
  );
};

export default CloseBtn;

