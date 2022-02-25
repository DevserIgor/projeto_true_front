import api from "./api";

export interface StoreDTO {
  id?: string;
  name: string;
  email: string;
}

export const getData = async (page = 1, name?: string) => {
  try {
    const response = await api.get(`/users?page=${page}`, { params: { name } });
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data;
    } else if (error.data) {
      throw error.data;
    } else {
      throw [{ message: `Ocorreu um erro: ${error}` }];
    }
  }
};
export const getBydId = async (id: string) => {
  try {
    const response = await api.get(`/users/${id}`);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data;
    } else if (error.data) {
      throw error.data;
    } else {
      throw [{ message: `Ocorreu um erro: ${error}` }];
    }
  }
};

// };

export const create = async (data: StoreDTO) => {
  try {
    const response = await api.post("/users", data);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data;
    } else if (error.data) {
      throw error.data;
    } else {
      throw [{ message: `Ocorreu um erro: ${error}` }];
    }
  }
};
export const edit = async (id: string, data: StoreDTO) => {
  try {
    const response = await api.put(`/users/${id}`, data);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data;
    } else if (error.data) {
      throw error.data;
    } else {
      throw { message: `Ocorreu um erro: ${error}` };
    }
  }
};

export const trash = async (id: string) => {
  try {
    await api.delete(`/users/${id}`);
    return true;
  } catch (error) {
    if (error.response) {
      throw error.response.data;
    } else if (error.data) {
      throw error.data;
    } else {
      throw [{ message: `Ocorreu um erro: ${error}` }];
    }
  }
};
