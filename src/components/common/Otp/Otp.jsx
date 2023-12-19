import React from "react";
import OtpInput from "react-otp-input";
import "./style.css"
const Otp = ({ otp, setOtp }) => {
  const handleChange = (value) => {
    setOtp(value);
  };
  return (
      <OtpInput
        value={otp}
        onChange={handleChange}
        numInputs={6}
        renderSeparator={<span>-</span>}
        renderInput={(props) => <input {...props} />}
        inputStyle="otpStyle"
      />
  );
};

export default Otp;
