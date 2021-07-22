import axios from 'axios';

import {useSelector} from 'react-redux';

export const AXIOSKIT = axios.create({
  baseURL: 'https://www.breakingbadapi.com',
  headers: {
    'Content-Type': 'application/json',
    'Api-Version': 'v1',
  },
});

export const AXIOS_TOOL = async (method, endPoint, data, authorisation) => {
  var res;
  switch (method) {
    case 'POST':
      res = await AXIOSKIT.post(endPoint, data)
        .then(res => {
          return res;
        })
        .catch(e => {
          return e.response;
        });

      break;

    case 'GET':
      res = await AXIOSKIT.get(endPoint)
        .then(res => {
          return res;
        })
        .catch(e => {
          return e.response;
        });
      break;
    case 'PUT':
      res = await AXIOSKIT.put(endPoint, data)
        .then(res => {
          return res;
        })
        .catch(e => {
          return e.response;
        });
      break;
    case 'DELETE':
      if (data) {
        res = await AXIOSKIT.delete(endPoint, data)
          .then(res => {
            return res;
          })
          .catch(e => {
            return e.response;
          });
      } else {
        res = await AXIOSKIT.post(endPoint)
          .then(res => {
            return res;
          })
          .catch(e => {
            return e.response;
          });
      }
      break;
  }
  return res;
};
