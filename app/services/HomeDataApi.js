import {getApiCall} from './ApiWrapper';

export const getDataList = () => {
  return new Promise((success, failure) => {
    getApiCall(`../data/ApiData.json`)
      .then((response) => {
        console.log('res===>', response);
        success(response?.data);
      })
      .catch((errorResponse) => {
        console.log('res=err==>', errorResponse);
        failure(errorResponse);
      });
  });
};
