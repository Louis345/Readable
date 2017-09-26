import axios from "axios";
import config from "../config/config";
var api = {
  getData() {
    return axios.post(config.serverAddress, {
      select: "select"
    });
  }
};

export default api;
