import axios from 'axios';

const updateImgApi = {
	updateImg(file) {
		const CLOUD_NAME = 'lazedafpoly';
		const PRESET_NAME = 'lazeda-img';
		const FOLDER_NAME = 'lazedaFpoly';
		const url = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

		const formData = new FormData();
		formData.append('upload_preset', PRESET_NAME);
		formData.append('folder', FOLDER_NAME);
		formData.append('file', file);
		return axios.post(url, formData, {
			Headers: {
				'Content-Type': 'multipart/form-data',
			},
		});
	},
	deleteImg(publicId) {
		const CLOUD_NAME = 'lazedafpoly';
		const API_KEY = '556661696118162';
		const API_SECRET = 'eP_GvFk0BkwXKpHCYHtsF9rI_b8';
		const timestamp = Math.floor(new Date().getTime() / 1000);
		const signature = cloudinary.utils.api_sign_request(
			{ public_id: publicId, timestamp: timestamp },
			API_SECRET
		);

		const deleteUrl = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/destroy/${publicId}`;

		return axios.delete(deleteUrl, {
			headers: {
				Authorization: `Basic ${btoa(`${API_KEY}:${API_SECRET}`)}`,
				'X-CLOUDINARY-API-KEY': API_KEY,
				'X-CLOUDINARY-TIMESTAMP': timestamp,
				'X-CLOUDINARY-SIGNATURE': signature,
			},
		});
	},
};

export default updateImgApi;
