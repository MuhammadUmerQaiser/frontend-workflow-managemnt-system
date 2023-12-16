/* eslint-disable no-useless-constructor */
import axios from "axios";

export class AuthService {
  constructor() {}

  async login(data) {
    try {
      const response = await axios.post(
        "define url here like localhost:8000/api" + "/login",
        data
      );
      return response;
    } catch (err) {
      return err;
    }
  }
}
