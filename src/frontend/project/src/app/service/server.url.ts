
export const DEBUG = false;
export const STAGE = false;

export let LOCAL_REST_API_SERVER = '';
export let LOCAL_SERVER = '';

if (DEBUG) {
    LOCAL_REST_API_SERVER = 'http://localhost:8000/api/';
    LOCAL_SERVER = 'http://localhost:8000/';
} else if (STAGE) {
    LOCAL_REST_API_SERVER = 'http://192.168.1.239:8000/api/';
    LOCAL_SERVER = 'http://192.168.1.239:8000/';
} else {
    LOCAL_REST_API_SERVER = '/api/';
    LOCAL_SERVER = '/'
}