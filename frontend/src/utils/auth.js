export const BASE_URL = 'https://api.melifaro13.nomoredomains.work';

export function register(email, password) {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: "include",
    body: JSON.stringify({ email, password }),
  })
    .then((response) => {
      if (response.status === 200) {
       return response.json();
        } else {
          response.json().then((data) => console.error(data.error));
          throw new Error();
        }
      })
      .then((res) => {
        return res;
      })
}

export function authorize(email, password) {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: "include",
    body: JSON.stringify({ email, password }),
  })
   .then((response) => {
   if (response.status === 200) {
    return response.json();
      } else {
        response.json().then((data) => console.error(data.message));
        throw new Error();
      }
    })
    // .then((data) => {
    //   if (data.token) {
    //     localStorage.setItem('jwt', data.token);
    //     return data;
    //   }
    // })
    .catch((err) => console.log(err));
}

export function getToken() {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      //Authorization: `Bearer ${jwt}`,
    },
    credentials: "include",
  })
    .then((res) => res.json())
    .then((data) => data);
}

export function logout() {
  return fetch(`${BASE_URL}/logout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        response.json().then((data) => console.error(data.message));
        throw new Error();
      }
    })
    .catch((err) => {
      throw err
    });
};
