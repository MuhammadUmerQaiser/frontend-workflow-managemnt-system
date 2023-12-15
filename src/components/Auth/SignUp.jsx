import React from "react";
import { useAppSelector } from "../../store";
const SignUp = () => {
  
  const { user } = useAppSelector((state) => state.auth);
  console.log("user", user);

  return (
    <div>Signup</div>
  )
};

export default SignUp;
