import axiosRoute from './../config';

const booksApi = {
	insert(data) {
		const url = 'book/add';
		return axiosRoute.post(url, data);
	},
	getAll(page, limit) {
		const url = `book/?page=${page}&limit=${limit}`;
		return axiosRoute.get(url);
	},
	getOne(id) {
		const url = `book/${id}`;
		return axiosRoute.get(url);
	},
	getByNameCate(id) {
		const url = `book/category/${id}`;
		return axiosRoute.get(url);
	},
	search(query) {
		const url = `book/search?q=${query}`;
		return axiosRoute.get(url);
	},
	update(id, data) {
		const url = `book/update/${id}`;
		return axiosRoute.put(url, data);
	},
	delete(id) {
		const url = `book/delete/${id}`;
		return axiosRoute.delete(url);
	},
};

export default booksApi;
