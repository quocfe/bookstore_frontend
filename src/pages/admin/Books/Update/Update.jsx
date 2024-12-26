import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { Toastify } from '../../../../components/Toast/Toast';
import booksAdminApi from './../../../../api/admin/books';
import { handleUploadFile } from './../../../../helper/upload';
import UpdateForm from './Form';

const Update = ({ show, book, onHide }) => {
	const handleUpdateButtonClick = async (formData) => {
		try {
			const idBook = book.idProduct;
			let images;
			let idCategory = formData?.idCategory
				? formData.idCategory
				: book.idCategory;
			if (book.images != formData.images) {
				images = await handleUploadFile(formData.images);
			} else {
				images = book.images;
			}
			if (images) {
				let dataUpdate = {
					...formData,
					images,
					idCategory,
				};
				await booksAdminApi.update(idBook, dataUpdate);
				Toastify('success', 'Update success');
				onHide();
			}
		} catch (error) {
			Toastify('error', 'Update error');
			console.log(error);
		}
	};

	return (
		<Modal show={show} onHide={onHide}>
			<Modal.Header closeButton>
				<Modal.Title>Update book</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<UpdateForm
					book={book}
					handleUpdateButtonClick={handleUpdateButtonClick}
				/>
			</Modal.Body>
		</Modal>
	);
};

export default Update;
