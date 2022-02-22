import api from "./api";

export interface StoreDTO {
  id: string;
  name: string;
  domain: string;
}

export const getData = async (page = 1, pageSize = 10000) => {
  try {
    const response = await api.get(`/stores/`);
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

// export const create = async (data) => {
//   try {
//     const response = await api.post("/client", data);
//     return response.data;
//   } catch (error) {
//     if (error.response) {
//       throw error.response.data;
//     } else if (error.data) {
//       throw error.data;
//     } else {
//       throw [{ message: `Ocorreu um erro: ${error}` }];
//     }
//   }
// };
// export const edit = async (id, data) => {
//   try {
//     const response = await api.put(`/client/${id}`, data);
//     return response.data;
//   } catch (error) {
//     if (error.response) {
//       throw error.response.data;
//     } else if (error.data) {
//       throw error.data;
//     } else {
//       throw [{ message: `Ocorreu um erro: ${error}` }];
//     }
//   }
// };

// export const trash = async (id) => {
//   try {
//     await api.delete(`/client/${id}`);
//     return true;
//   } catch (error) {
//     if (error.response) {
//       throw error.response.data;
//     } else if (error.data) {
//       throw error.data;
//     } else {
//       throw [{ message: `Ocorreu um erro: ${error}` }];
//     }
//   }
// };
