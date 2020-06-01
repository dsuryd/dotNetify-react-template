class Auth {
  url = '/token';

  signIn(username: string, password: string): Promise<void> {
    return fetch(this.url, {
      method: 'post',
      mode: 'no-cors',
      body: 'username=' + username + '&password=' + password + '&grant_type=password&client_id=dotnetifydemo',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
    })
      .then(response => {
        if (!response.ok) throw new Error(`${response.status}`);
        return response.json();
      })
      .then(token => {
        window.sessionStorage.setItem('access_token', token.access_token);
      });
  }

  signOut() {
    window.sessionStorage.removeItem('access_token');
    window.location.href = '/';
  }

  getAccessToken(): string {
    return window.sessionStorage.getItem('access_token');
  }

  hasAccessToken(): boolean {
    return this.getAccessToken() != null;
  }
}

export default new Auth();
