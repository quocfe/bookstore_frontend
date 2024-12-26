function generateRandomISBN() {
	// Tạo số ISBN với 13 chữ số (định dạng ISBN-13)
	const isbnArray = Array.from({ length: 12 }, () =>
		Math.floor(Math.random() * 10)
	);

	// Tính toán chữ số kiểm tra (check digit)
	const checkDigit = calculateCheckDigit(isbnArray);

	// Thêm chữ số kiểm tra vào mảng
	isbnArray.push(checkDigit);

	// Chuyển mảng thành chuỗi ISBN
	const isbnString = isbnArray.join('');

	return isbnString;
}

function calculateCheckDigit(isbnArray) {
	// Tính toán chữ số kiểm tra theo thuật toán ISBN
	const sum = isbnArray.reduce(
		(acc, digit, index) => acc + digit * (index % 2 === 0 ? 1 : 3),
		0
	);
	const checkDigit = (10 - (sum % 10)) % 10;

	return checkDigit;
}

export default generateRandomISBN;
