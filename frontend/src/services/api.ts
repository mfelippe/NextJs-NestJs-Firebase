import axios from "axios";
import { Servicos } from "../types/Servicos";

const api = axios.create({
  baseURL: "http://localhost:3001/lovyca-services",
});

export const useApi = () => ({
  cadastrarServico: async (data: Servicos) => {
    try {
      api.defaults.headers["Content-Type"] = "application/json";
      const response = await api.post("/", data);
      if (response.status != 201) {
        throw "Erro ao criar o serviço";
      }
      return response.data;
    } catch (err) {
      return;
    }
  },

  atualizarServico: async (id: string, data: Servicos) => {
    try {
      api.defaults.headers["Content-Type"] = "application/json";
      const response = await api.put(`/${id}`, data);
      if (response.status != 200) {
        throw "Erro ao criar o serviço";
      }
      return response.data;
    } catch (err) {
      return;
    }
  },
});
