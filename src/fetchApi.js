
// these are injected by create-react-app when building
const ADDRESS = process.env.REACT_APP_API_ADDRESS; // "https://hcc.cs.ox.ac.uk";
const API_ROOT = process.env.REACT_APP_API_ROOT; //"/fba-api/";

function resolveURL(endpoint){
	const path = `${API_ROOT}${endpoint}`.replace(/\/+/g,'/');
	return `${ADDRESS}${path}`;
};

// simply wrap fetch
export function fetchApi(endpoint, ...args){
	const apiURL = resolveURL(endpoint);
	return fetch(apiURL, ...args);
}
