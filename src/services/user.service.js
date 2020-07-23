import dotenv from 'dotenv';
import authHeader from '../helpers/auth-header';

dotenv.config();

export const userService = {
    signUp,
    signIn,
    signOut,
    updateDetails,
    getAll
};

function signUp(email, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    };

    return fetch(`${process.env.REACT_APP_API_URI}/user/signup`, requestOptions)
        .then(handleResponse)
        .then(user => {
            // login successful if there's a user in the response
            if (user) {
                // store user details and basic auth credentials in local storage 
                // to keep user logged in between page refreshes
                user.authdata = user.token;
                localStorage.setItem('user', JSON.stringify(user));
            }

            return user;
        });
}

function signIn(email, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    };

    return fetch(`${process.env.REACT_APP_API_URI}/user/signin`, requestOptions)
        .then(handleResponse)
        .then(user => {
            // login successful if there's a user in the response
            if (user) {
                // store user details and basic auth credentials in local storage 
                // to keep user logged in between page refreshes
                user.authdata = user.token;
                localStorage.setItem('user', JSON.stringify(user));
            }

            return user;
        });
}

function signOut() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function updateDetails(name) {
    let header = authHeader();
    header['Content-Type'] = 'application/json';

    const requestOptions = {
        method: 'POST',
        headers: header,
        body: JSON.stringify({ name })
    };

    return fetch(`${process.env.REACT_APP_API_URI}/user/updatedetails`, requestOptions)
    .then(handleResponse);
    
    }

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${process.env.REACT_APP_API_URI}/user`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                signOut();
                window.location.reload(true);
            }

            const error = (data && data.error) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}