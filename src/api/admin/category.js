import axiosRoute from './../config';

const categoryAdminApi = {
	insert(data) {
		const url = 'admin/category/add';
		return axiosRoute.post(url, data);
	},
	getAll() {
		const url = `admin/category`;
		return axiosRoute.get(url);
	},
	getOne(id) {
		const url = `admin/category/${id}`;
		return axiosRoute.get(url);
	},
	search(query) {
		const url = `admin/category/search?q=${query}`;
		return axiosRoute.get(url);
	},
	update(id, data) {
		const url = `admin/category/update/${id}`;
		return axiosRoute.put(url, data);
	},
	delete(id) {
		const url = `admin/category/${id}`;
		return axiosRoute.delete(url);
	},
};

export default categoryAdminApi;
