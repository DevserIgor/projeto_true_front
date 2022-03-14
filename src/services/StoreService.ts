import api from "./api";

export interface StoreDTO {
  id?: string;
  name: string;
  domain: string;
  active?: boolean;
}

interface Filters {
  cnpj?: string;
  name?: string;
  domain?: string;
  active?: boolean;
}
export const getData = async (page = 1, params: Filters) => {
  try {
    console.log(
      { params },
      api.get(`/stores`, { params: { ...params, page } })
    );
    const response = await api.get(`/stores`, { params: { ...params, page } });

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
    const response = await api.get(`/stores/${id}`);
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
    const response = await api.post("/stores", data);
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
    const response = await api.put(`/stores/${id}`, data);
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
    await api.delete(`/stores/${id}`);
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
