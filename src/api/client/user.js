import axiosRoute from './../config';

const userApi = {
	getAllUser() {
		const url = 'user';
		return axiosRoute.get(url);
	},
	getUser(id) {
		const url = `user/${id}`;
		return axiosRoute.get(url);
	},
};

export default userApi;
