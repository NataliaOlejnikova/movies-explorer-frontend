class BaseApi {
  constructor({ baseUrl, headers, credentials }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
    this._credentials = credentials;
  }

  _fetch(url, { method, body, headers }) {
    return fetch(`${this._baseUrl}${url}`, {
      method,
      body,
      credentials: this._credentials,
      headers: { ...this._headers, ...headers },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(new Error(`Ошибка: ${res.status}`));
      });
  }
}

export default BaseApi;
