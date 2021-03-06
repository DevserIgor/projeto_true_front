import api from "./api";

export interface AssessmentDTO {
  id?: string;
  name: string;
  stars: number;
  message: string;
  date: Date;
  product_id?: number | null;
  approved?: boolean | null;
}

interface Filters {
  name?: string;
  stars?: number;
  message?: string;
  dateStart?: string;
  dateEnd?: string;
  approved?: boolean;
}

export const getData = async (page = 1, params: Filters) => {
  try {
    const response = await api.get(`/assessments`, {
      params: { ...params, page },
    });
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
export const getDataRandom = async (page = 1, productId: number) => {
  try {
    const response = await api.get(`/assessmentsRandom`, {
      params: { productId },
    });
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
export const createRandom = async (data: AssessmentDTO) => {
  try {
    const response = await api.post("/assessmentsRandom", data);
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
export const approveAssessment = async (id: string, approved: boolean) => {
  try {
    const response = await api.put(`/assessmentsApproval/${id}`, { approved });
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
