import fetch from 'dva/fetch';
import qs from 'qs';
import { show } from '../components/Login';
import config from './config';
import { showMessage } from '../components/Notification';

let accessToken = '';

export function getToken() {
  return accessToken;
}

function refreshToken(refresh_token) {
  request('/user/refresh_token', {
    method: 'POST',
    body: {
      refresh_token,
    },
  });
}

function registerToken(data) {
  accessToken = data.access_token;
  setTimeout(() => {
    refreshToken(data.refresh_token);
  }, (data.expires_in - 10) * 1000);
}

function resolveToken({ data }) {
  if (data.access_token) {
    registerToken(data);
  }
  return { data };
}

function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else if (response.status === 401) {
    show();
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, { headers, ...options } = {}) {
  const opts = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: accessToken,
      ...headers,
    },
    ...options,
  };
  if (opts.body) {
    opts.body = qs.stringify(opts.body);
  }
  return fetch(`${config[process.env.NODE_ENV]}${url}`, opts)
    .then(checkStatus)
    .then(parseJSON)
    .then((resolveToken))
    .catch((err) => {
      showMessage({
        message: err.message || '请求失败，请稍后再是',
      });
      return { err };
    });
}
