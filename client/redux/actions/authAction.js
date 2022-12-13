export const REGISTER_USER_SUCCESS = "REGISTER_USER_SUCCESS"
export const REGISTER_USER_FAIL = "REGISTER_USER_FAIL"
export const LOGIN_USER_SUCCESS = "LOGIN_USER_SUCCESS"
export const LOGIN_USER_FAIL = "LOGIN_USER_FAIL"

const BASE_URL = 'http://10.3.100.225:3000'

export const registerUser = authData => {
    const { fullName, email, password } = authData;
    
    return async dispatch => {
        const result = await fetch(`${BASE_URL}/api/users/register`, {
            method: 'POST',
            headers: {
                'CONTENT-TYPE': 'application/json'
            },
            body: JSON.stringify({
                fullName,
                email,
                password
            })
        })

        const resultData = await result.json();

        if (resultData.success) {
            dispatch({
                type: REGISTER_USER_SUCCESS,
                payload: resultData
            })
        } else {
            dispatch({
                type: REGISTER_USER_FAIL,
                payload: resultData
            })
        }

        return resultData;
    }
}

export const loginUser = authData => {
    const { email, password } = authData;

    return async dispatch => {
        const result = await fetch(`${BASE_URL}/api/users/login`, {
            method: 'POST',
            headers: {
                'CONTENT-TYPE': 'application/json'
            },
            body: JSON.stringify({
                email, 
                password
            })
        })

        const resultData = await result.json();

        if (resultData.success) {
            dispatch({
                type: LOGIN_USER_SUCCESS,
                payload: resultData
            })
        } else {
            dispatch({
                type: LOGIN_USER_FAIL,
                payload: resultData
            })
        }

        return resultData;
    }
}