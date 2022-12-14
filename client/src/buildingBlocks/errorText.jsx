import React from "react";

const ErrorText = ({ error }) => {
  return (
    <div className="error">
      <p className="error__text">{error}</p>
    </div>
  );
};

export default ErrorText;
