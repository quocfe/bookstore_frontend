import axiosRoute from '../config';

const commentsApi = {
	insert(data) {
		const url = 'comment/add';
		return axiosRoute.post(url, data);
	},
	getAll() {
		const url = `comment`;
		return axiosRoute.get(url);
	},
	getOne(id) {
		const url = `comment/${id}`;
		return axiosRoute.get(url);
	},
	getAllByIdProduct(id) {
		const url = `comment/product/${id}`;
		return axiosRoute.get(url);
	},
	search(query) {
		const url = `comment/search?q=${query}`;
		return axiosRoute.get(url);
	},
	update(id, data) {
		const url = `comment/update/${id}`;
		return axiosRoute.put(url, data);
	},
	delete(id) {
		const url = `comment/${id}`;
		return axiosRoute.delete(url);
	},
};

export default commentsApi;
