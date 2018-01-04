
import axios              from 'axios';
import { browserHistory } from 'react-router';

import {
    AUTH_USER, AUTH_ERROR, UNAUTH_USER, FETCH_MESSAGE
} from './types';

const ROOT_URL = 'http://localhost:3090';


export function signinUser( { email, password } ) {
    return function( dispatch ) {
        axios
            .post( `${ROOT_URL}/signin`, { email, password } )
            .then( 
                resp => {
                    dispatch( { type: AUTH_USER } );
                    localStorage.setItem( 'token', resp.data.token );
                    browserHistory.push( '/feature' );
                }
            )
            .catch( () => dispatch( authError( 'Bad Login Info' ) ) );
    }
}

export function signupUser( { email, password } ) {
    return function( dispatch ) {
        axios
            .post( `${ROOT_URL}/signup`, { email, password } )
            .then(
                resp => {
                    dispatch( { type: AUTH_USER } );
                    localStorage.setItem( 'token', resp.data.token );
                    browserHistory.push( '/feature' );
                }
            )
            .catch( err => { dispatch( authError( err.response.data.error ) ); } );
    }
}

export function authError( error ) {
    return {
        type: AUTH_ERROR,
        payload: error
    }
}

export function signoutUser() {
    localStorage.removeItem( 'token' );

    return { type: UNAUTH_USER };
}

export function fetchMessage() {
    return function( dispatch ) {
        axios.get(
            ROOT_URL,
            { headers: { authorization: localStorage.getItem( 'token' ) } }
        ).then( resp => dispatch( { type: FETCH_MESSAGE, payload: resp.data.message } ) );
    }
}
