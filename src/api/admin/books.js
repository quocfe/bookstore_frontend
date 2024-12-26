import axiosRoute from './../config';

const booksAdminApi = {
	insert(data) {
		const url = 'admin/book/add';
		return axiosRoute.post(url, data);
	},
	getAll(page = 1, limit = 100) {
		const url = `admin/book/?page=${page}&limit=${limit}`;
		return axiosRoute.get(url);
	},
	getOne(id) {
		const url = `admin/book/${id}`;
		return axiosRoute.get(url);
	},
	search(query) {
		const url = `admin/book/search?q=${query}`;
		return axiosRoute.get(url);
	},
	update(id, data) {
		const url = `admin/book/update/${id}`;
		return axiosRoute.put(url, data);
	},
	delete(id) {
		const url = `admin/book/${id}`;
		return axiosRoute.delete(url);
	},
	isbnExists(isbn) {
		console.log('isbn', isbn);
		const url = 'admin/book/isbnExists';
		return axiosRoute.get(url, isbn);
	},
};

export default booksAdminApi;
