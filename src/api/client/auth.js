import axiosRoute from './../config';
const authApi = {
	register(user) {
		const url = 'auth/register';
		return axiosRoute.post(url, user);
	},
	login(user) {
		const url = 'auth/login';
		return axiosRoute.post(url, user);
	},
	refreshToken(refreshToken) {
		const url = `auth/refreshToken`;
		return axiosRoute.post(url, refreshToken);
	},
	logout() {
		const url = `auth/logout`;
		return axiosRoute.post(url);
	},
};

export default authApi;
