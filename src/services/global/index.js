import axios from "axios";

const getData = async (endpoint) => {
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
};

export const getAllRoles = async () => {
  try {
    const endpoint = `${
      process.env.REACT_APP_BACKEND_URL
    }/get-all-roles?paginatedData=${false}`;
    const response = await getData(endpoint);
    if (response.status === 200) {
      return response?.data?.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getAllDomains = async () => {
  try {
    const endpoint = `${
      process.env.REACT_APP_BACKEND_URL
    }/get-all-domains?paginatedData=${false}`;
    const response = await getData(endpoint);
    if (response.status === 200) {
      return response?.data?.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getAllDesignation = async () => {
  try {
    const endpoint = `${
      process.env.REACT_APP_BACKEND_URL
    }/get-all-designations?paginatedData=${false}`;
    const response = await getData(endpoint);
    if (response.status === 200) {
      return response?.data?.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getAllGrades = async () => {
  try {
    const endpoint = `${
      process.env.REACT_APP_BACKEND_URL
    }/get-all-grades?paginatedData=${false}`;
    const response = await getData(endpoint);
    if (response.status === 200) {
      return response?.data?.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getAllTasks = async () => {
  try {
    const endpoint = `${
      process.env.REACT_APP_BACKEND_URL
    }/get-all-tasks?paginatedData=${false}`;
    const response = await getData(endpoint);
    if (response.status === 200) {
      return response?.data?.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getAllTeams = async () => {
  try {
    const endpoint = `${
      process.env.REACT_APP_BACKEND_URL
    }/get-all-teams?paginatedData=${false}`;
    const response = await getData(endpoint);
    if (response.status === 200) {
      return response?.data?.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getCategories = async (pagination = false) => {
  try {
    const endpoint = `${process.env.REACT_APP_BACKEND_URL}/get-all-categories?paginatedData=${pagination}`;
    const response = await getData(endpoint);
    if (response.status === 200) {
      return response?.data?.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getSubCategories = async (category = null, pagination = false) => {
  try {
    const endpoint = `${process.env.REACT_APP_BACKEND_URL}/get-all-sub-categories?paginatedData=${pagination}&category=${category}`;
    const response = await getData(endpoint);
    if (response.status === 200) {
      return response?.data?.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getAllSubCategoriesBasedOnMultipleCategoires = async (categories = []) => {
  try {
    const endpoint = `${process.env.REACT_APP_BACKEND_URL}/get-sub-categories-by-multiple-categories?categories=${categories}`;
    const response = await getData(endpoint);
    if (response.status === 200) {
      return response?.data?.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getTaxPayersBasedOnMultipleCategoriesAndSubCategories = async (categories = [], subCategories = []) => {
  try {
    const endpoint = `${process.env.REACT_APP_BACKEND_URL}/get-tax-payers-by-multiple-categories-&-sub-categories?categories=${categories}&subCategories=${subCategories}`;
    const response = await getData(endpoint);
    if (response.status === 200) {
      return response?.data?.data;
    }
  } catch (error) {
    console.log(error);
  }
};
