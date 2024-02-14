/* eslint-disable no-useless-constructor */
import axios from "axios";

export class EmployeeService {
  constructor() {}

  async getAllEmployees() {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        "http://localhost:5000/auth/get-all-employees",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response;
    } catch (err) {
      return err;
    }
  }
  async addEmployees(data) {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        "http://localhost:5000/auth/employee-signup",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response;
    } catch (err) {
      return err;
    }
  }
}
