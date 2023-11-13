import axios from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.VITE_REQUEST_URL,
});

const DataService = {
  async getData(path: string) {
    return (await instance.get(path)).data;
  },

  async getResponse(path: string, params: object) {
    return instance.get(path, { params });
  }
};

export default DataService;
