import axiosRoute from './../config';

const reviewApi = {
	insert(data) {
		const url = 'review/add';
		return axiosRoute.post(url, data);
	},
	getAll(page, limit) {
		const url = `review?page=${page}&limit=${limit}`;
		return axiosRoute.get(url);
	},
	getOne(id) {
		const url = `review/${id}`;
		return axiosRoute.get(url);
	},
	update(id, data) {
		const url = `review/update/${id}`;
		return axiosRoute.put(url, data);
	},
	delete(id) {
		const url = `review/${id}`;
		return axiosRoute.delete(url);
	},
	selectByProduct(id) {
		const url = `review/selectByProduct/${id}`;
		return axiosRoute.get(url);
	},
	updateView(id) {
		const url = `review/view/${id}`;
		return axiosRoute.get(url);
	},
};

export default reviewApi;
