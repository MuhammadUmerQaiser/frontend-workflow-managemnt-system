import React, { useState } from "react";
import Otp from "../common/Otp/Otp";
import AuthButton from "../common/Button/AuthButton";

const Verification = () => {
  
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const handleVerify = () =>{

  }

  return (
    <div className="verifyWrap">
      <h3>Email Verification</h3>
      {/* idher we will show like we have sent an email to : jo user na email di thi during signup */}
      {/* <p>We have sent an email to: {}</p> */}
      <Otp otp={otp} setOtp={setOtp} />

      {/* idher we will show something like Didn’t receive code? Check your spam folder or and resend link  */}

      <AuthButton label="Verify Account" loading={loading} onClick={handleVerify} />
    </div>
  );
};

export default Verification;
