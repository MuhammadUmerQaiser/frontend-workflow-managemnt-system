/* eslint-disable no-useless-constructor */
import axios from "axios";

export class AdminService {
  constructor() {}

  async getData(endpoint) {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(endpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response;
    } catch (err) {
      return err;
    }
  }
  async postData(endpoint, data) {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(endpoint, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response;
    } catch (err) {
      return err;
    }
  }
  async deleteData(endpoint, id) {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.delete(endpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response;
    } catch (err) {
      return err;
    }
  }
  async putData(endpoint, data) {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.put(endpoint, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response;
    } catch (err) {
      return err;
    }
  }
}
