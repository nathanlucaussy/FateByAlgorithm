
const HOST = "localhost";
const PORT = 5000;
const PATH_ROOT = "/";

function resolveURL(endpoint){
	const path = `${PATH_ROOT}${endpoint}`.replace(/\/+/g,'/');
	return `http://${HOST}:${PORT}${path}`;
};

// simply wrap fetch
export function fetchApi(endpoint, ...args){
	const apiURL = resolveURL(endpoint);
	return fetch(apiURL, ...args);
}
