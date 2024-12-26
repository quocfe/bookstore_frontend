import updateImgApi from './../api/admin/updateImg';
export const handleUploadFile = async (file) => {
	try {
		const response = await updateImgApi.updateImg(file);
		return response.data.secure_url;
	} catch (error) {
		console.log(error);
	}
};

export const handleDeleteFile = async (publicId) => {
	try {
		await updateImgApi.deleteImg(publicId);
	} catch (error) {
		console.log(error);
	}
};
