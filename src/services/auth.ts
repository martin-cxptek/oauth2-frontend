
const API_BASE_URL = process.env.REACT_APP_BACKEND_URL;

export type JwtResponse = {
  token: string;
  type: string;
}

class AuthService  {
  
   public signIn = async (id_token: string): Promise<JwtResponse> => {
    const requestOptions = {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({token: id_token})
    };

    return fetch(`${API_BASE_URL}/api/auth/google-sign-in`, requestOptions)
    .then(response => {
      return response.json();
    })
    .then(josnData => {
      console.log('data=====', josnData);
      return josnData;
    });
  }
};

export default AuthService;