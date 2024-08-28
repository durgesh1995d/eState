import NetInfo from '@react-native-community/netinfo';
import axios, {Axios} from 'axios';
import {DomainURL} from '../utils/config';

const network_error = {
  status: 101,
  message: 'No Network Connected',
};
const general_error = {
  status: 100,
  message: 'Something went wrong',
};

const getNetwork = async () => {
  let isNetwork = false;
  await NetInfo.fetch().then((state) => {
    isNetwork = state.isConnected;
  });
  return isNetwork;
};

const getBaseUrl = async () => {
  let baseUrl = await DomainURL;
};

const config = async (token = null) => {
  const Token = token ? token : await getAuthToken();
  return {
    headers: {
      Authorization: 'Bearer ' + Token,
      'Content-Type': 'application/json',
    },
  };
};

const getAuthToken = async () => {
  return null;
  // let authToken = await AsyncStorage.getItem('@authToken');
  // return authToken;
};

export async function getApiCall(apiUrl) {
  const isNetworkConnected = await getNetwork();
  return new Promise(async (success, failure) => {
    if (isNetworkConnected) {
      const baseUrl = null;
      // const headers = await config();
      //axios
      await fetch(apiUrl)
        .then(async (res) => {
          if (res.status === 401) {
            failure({
              status: res.status,
              message: 'Unauthorized',
            });
          } else {
            try {
              const jsonData = await res.json();
              if (
                jsonData?.message?.includes(
                  'Object reference not set to an instance of an object'
                )
              ) {
                return {
                  data: {
                    ...jsonData,
                    message:
                      'Something went wrong, Sorry for the technical issue',
                  },
                  status: res.status,
                };
              } else {
                return {data: jsonData, status: res.status};
              }
            } catch (erro) {
              if (res.status >= 200 && res.status <= 210) {
                return {
                  data: {messsage: 'Success'},
                  status: res.status,
                };
              } else {
                return {
                  data: {messsage: 'ERROR'},
                  status: res.status,
                };
              }
            }
          }
        })
        .then((response) => {
          if (response.status >= 200 && response.status <= 210) {
            success(response.data);
          } else {
            failure({message: response.data, status: response.status});
          }
        })
        .catch((error) => {
          if (error.response) {
            if (error.response.status === 401) {
              logoutUser();
              failure({
                status: error.response?.status,
                message: error.response?.data,
              });
            } else {
              failure({
                status: error.response?.status,
                message: error.response?.data,
              });
            }
          } else if (error.message === 'Network Error') {
            failure(network_error);
          } else {
            failure(general_error);
          }
        });
    } else {
      failure(network_error);
    }
  });
}

export async function postApiCall(apiUrl, paramsJson) {
  const isNetworkConnected = await getNetwork();
  return new Promise(async (success, failure) => {
    if (isNetworkConnected) {
      const baseUrl = await getBaseUrl();
      const headers = await config();
      fetch(`${baseUrl}${apiUrl}`, {
        method: 'POST',
        headers: headers.headers,
        body: JSON.stringify(paramsJson),
      })
        .then(async (res) => {
          if (jsonRes.status === 401) {
            failure({
              status: jsonRes.status,
              message: 'Unauthorized',
            });
          } else {
            try {
              const jsonData = await res.json();
              if (
                jsonData?.message?.includes(
                  'Object reference not set to an instance of an object'
                )
              ) {
                return {
                  data: {
                    ...jsonData,
                    message:
                      'Something went wrong, Sorry for the technical issue',
                  },
                  status: res.status,
                };
              } else {
                return {
                  data: jsonData,
                  status: res.status,
                };
              }
            } catch (error) {
              if (res.status >= 200 && res.status <= 210) {
                return {
                  data: {messsage: 'Success'},
                  status: res.status,
                };
              } else {
                return {
                  data: {messsage: 'ERROR'},
                  status: res.status,
                };
              }
            }
          }
        })
        .then((response) => {
          if (response.status >= 200 && response.status <= 210) {
            success(response.data);
          } else {
            failure({message: response.data, status: response.status});
          }
        })
        .catch((error) => {
          if (error.response) {
            if (error.response.status === 401) {
              failure({
                status: error.response?.status,
                message: error.response?.data,
              });
            } else {
              failure({
                status: error.response?.status,
                message: error.response?.data,
              });
            }
          } else if (error.message === 'Network Error') {
            failure(network_error);
          } else {
            failure(general_error);
          }
        });
    } else {
      failure(network_error);
    }
  });
}

export async function putApiCall(apiUrl, paramsJson) {
  const isNetworkConnected = await getNetwork();
  return new Promise(async (success, failure) => {
    if (isNetworkConnected) {
      const baseUrl = getBaseUrl();
      axios
        .put(baseUrl + apiUrl, paramsJson, await config())
        .then((response) => {
          success(response);
        })
        .catch((error) => {
          if (error.response) {
            if (error.response.status === 401) {
            } else {
              failure({
                status: error.response.status,
                message: error.response.data,
              });
            }
          } else if (error.message === 'Network Error') {
            failure(network_error);
          } else {
            failure(general_error);
          }
        });
    } else {
      failure(network_error);
    }
  });
}
