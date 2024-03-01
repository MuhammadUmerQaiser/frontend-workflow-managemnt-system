/* eslint-disable no-useless-constructor */
import axios from "axios";

export class EmployeeService {
  constructor() {}

  async getAllEmployees(page) {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        `http://localhost:5000/api/get-all-employees?page=${page}`,
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
        "http://localhost:5000/api/employee-signup",
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
        `http://localhost:5000/api/delete-employee/${id}`,
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
        `http://localhost:5000/api/get-employee/${id}`,
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
        `http://localhost:5000/api/update-employee/${id}`,
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
