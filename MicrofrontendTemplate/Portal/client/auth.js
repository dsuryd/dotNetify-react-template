const url = '/api/login';

export const signIn = (username, password) => {
  return fetch(url, {
    method: 'post',
    body: 'username=' + username + '&password=' + password,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' }
  })
    .then(response => {
      if (!response.ok) throw new Error(response.status);
      return response.json();
    })
    .then(token => window.sessionStorage.setItem('access_token', token.access_token));
};

export const signOut = () => {
  window.sessionStorage.removeItem('access_token');
  window.location.href = '/';
};

export const validateToken = token => {
  return fetch(url + '/validate', {
    method: 'post',
    body: 'token=' + token,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' }
  }).then(response => response.ok);
};

export const getAccessToken = () => {
  return window.sessionStorage.getItem('access_token');
};

export const getAuthHeaders = _ => ({
  headers: { Authorization: 'Bearer ' + getAccessToken() },
  exceptionHandler: _ => signOut()
});
