import React, { useState, useMemo } from "react";
import Otp from "../../components/common/Otp/Otp";
import AuthButton from "../../components/common/Button/AuthButton";
import { AuthService } from "../../services/Auth/index.service";
import { useAppSelector,useAppDispatch } from "../../store";
import { Link } from "react-router-dom";
import { useSnackbar } from "notistack";
import { setUser } from "../../store/auth";

const Verification = () => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const authService = useMemo(() => new AuthService(), []);
  const { user } = useAppSelector((state) => state.auth);

  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useAppDispatch()

  const handleVerify = async () => {
    // setLoading(true);
    // if (otp.length < 6) {
    //   enqueueSnackbar("Please fill the whole Otp", {
    //     variant: "error",
    //   });
    //   setLoading(false);

    //   return;
    // }
    // try {
    //   const response = await authService.verifyAccount(
    //     {
    //       otp: otp,
    //     },
    //     user?.result?._id
    //   );
    //   if (response?.data?.message === "OTP verified successfully") {
    //     enqueueSnackbar("Account Verified Successfully", {
    //       variant: "success",
    //     });
    //     dispatch(setUser(response?.data?.updatedUser))
    //     return response;
    //   } else {
    //     enqueueSnackbar(response?.response?.data?.message, {
    //       variant: "error",
    //     });
    //   }
    // } catch (err) {
    //   return err;
    // } finally {
    //   setLoading(false);
    // }
  };

  return (
    <div className="verifyWrap">
      <h2>Email Verification</h2>
      <p>We have sent an email to:</p>
      <p>{user?.result?.email}</p>
      <Otp otp={otp} setOtp={setOtp} />

      <AuthButton
        label="Verify Account"
        loading={loading}
        onClick={handleVerify}
      />
      <p>
        Didn’t receive code? Check your spam folder or{" "}
        <span>
          <Link
            className="forgotPasswordTypo"
            to="#"
            style={{
              textDecoration: "none",
            }}
          >
            Resend Code
          </Link>
        </span>
      </p>
    </div>
  );
};

export default Verification;
