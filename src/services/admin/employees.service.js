/* eslint-disable no-useless-constructor */
import axios from "axios";

export class EmployeeService {
  constructor() {}

  async getAllEmployees(page) {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        `http://localhost:5000/auth/get-all-employees?page=${page}`,
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
  async deleteEmployee(id) {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.delete(
        `http://localhost:5000/auth/delete-employee/${id}`,
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
  async getSingleEmployeeDetailById(id) {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        `http://localhost:5000/auth/get-employee/${id}`,
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
  async updateEmployee(id, data) {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.put(
        `http://localhost:5000/auth/update-employee/${id}`,
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
