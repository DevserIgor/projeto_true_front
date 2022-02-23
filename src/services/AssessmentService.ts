import api from "./api";

export interface AssessmentDTO {
  id?: string;
  name: string;
  stars: number;
  message: string;
  date: Date;
}

export const getData = async (page = 1) => {
  try {
    const response = await api.get(`/assessments?page=${page}`);
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
    const response = await api.get(`/assessments/${id}`);
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

export const create = async (data: AssessmentDTO) => {
  try {
    const response = await api.post("/assessments", data);
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
export const edit = async (id: string, data: AssessmentDTO) => {
  try {
    const response = await api.put(`/assessments/${id}`, data);
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
    await api.delete(`/assessments/${id}`);
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
