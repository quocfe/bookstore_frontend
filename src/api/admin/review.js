import axiosRoute from './../config';

const reviewAdminApi = {
	insert(data) {
		const url = 'admin/review/add';
		return axiosRoute.post(url, data);
	},
	getAll(page, limit) {
		const url = `admin/review?page=${page}&limit=${limit}`;
		return axiosRoute.get(url);
	},
	getOne(id) {
		const url = `admin/review/${id}`;
		return axiosRoute.get(url);
	},
	update(id, data) {
		const url = `admin/review/update/${id}`;
		return axiosRoute.put(url, data);
	},
	delete(id) {
		const url = `admin/review/${id}`;
		return axiosRoute.delete(url);
	},
	selectByProduct(id) {
		const url = `admin/review/selectByProduct/${id}`;
		return axiosRoute.get(url);
	},
};

export default reviewAdminApi;
