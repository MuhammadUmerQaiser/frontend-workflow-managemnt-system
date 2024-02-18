/* eslint-disable no-useless-constructor */
import axios from "axios";

export class AuthService {
  constructor() { }

  async login(data) {
    try {
      const response = await axios.post(
        "http://localhost:5000/auth/login",
        data
      );
      return response;
    } catch (err) {
      return err;
    }
  }
  async signup(data) {
    try {
      const response = await axios.post(
        "http://localhost:5000/auth/admin-register",
        data
      );
      return response;
    } catch (err) {
      return err;
    }
  }
  async verifyAccount(otp, id) {
    try {
      const response = await axios.post(
        `http://localhost:5000/auth/verify-otp/${id}`,
        otp
      );
      return response;
    } catch (err) {
      return err;
    }
  }
}
