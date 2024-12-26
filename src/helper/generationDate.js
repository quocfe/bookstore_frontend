export const generationDate = (datetimeString) => {
	let time;
	let dateTime = new Date(datetimeString);
	time = `${dateTime.getDate()}-${
		dateTime.getMonth() + 1
	}-${dateTime.getFullYear()}`;
	return time;
};
