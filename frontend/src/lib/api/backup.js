import Cookies from "universal-cookie";
import { backupInitialize } from "../../modules/backup";

const feathers = require("@feathersjs/feathers");
const rest = require("@feathersjs/rest-client");
const axios = require("axios");

const app = feathers();
const cookies = new Cookies();

const restClient = rest("http://localhost:3030");

app.configure(restClient.axios(axios));

const backup = app.service("backup");

export const backupDownloadApi = (_id,data) => {
  return backup.get(_id,data,{
    headers: {
      Authorization: "Bearer " + cookies.get("access_token"),
      responseType: 'arraybuffer',
      // ,responseType: 'arraybuffer'
    }
  });
};
// export const backupDownloadApi = async (_id) => {
//   try {
//           const link = document.createElement("a");
//           link.href = `http://localhost:3030/backup/${_id}`;
//           link.setAttribute("download", "backup.zip");
//           document.body.appendChild(link);
//           await link.click();
//           backupInitialize();
//           return 'success';
//         } catch (error) {
//         setBackupLoading(false);
//         console.log(error);
//         return 'failure'
//       }
// };
