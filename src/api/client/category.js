import axiosRoute from '../config';

const categoryApi = {
	insert(data) {
		const url = 'category/add';
		return axiosRoute.post(url, data);
	},
	getAll() {
		const url = `category`;
		return axiosRoute.get(url);
	},
	getOne(id) {
		const url = `category/${id}`;
		return axiosRoute.get(url);
	},
	search(query) {
		const url = `category/search?q=${query}`;
		return axiosRoute.get(url);
	},
	update(id, data) {
		const url = `category/update/${id}`;
		return axiosRoute.put(url, data);
	},
	delete(id) {
		const url = `category/${id}`;
		return axiosRoute.delete(url);
	},
};

export default categoryApi;
