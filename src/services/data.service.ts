import axios from 'axios';

axios.defaults.baseURL = 'https://test-front.framework.team/';

const DataService = {
  async getData(path: string) {
    return (await axios.get(path)).data;
  },
  async getResponse(path: string, params: object) {
    return axios.get(path, {params});
  },
  async getImg(path: string) {
    return (await axios.get(path, { responseType: 'arraybuffer' })).data;
  },
};
export default DataService;
