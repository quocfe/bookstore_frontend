import React from 'react';
import Modal from 'react-bootstrap/Modal';
import booksAdminApi from '../../../../api/admin/books';
import { Toastify } from './../../../../components/Toast/Toast';
import { handleUploadFile } from './../../../../helper/upload';
import './Add.css';
import AddForm from './Form';

const Add = ({ show, onHide }) => {
	const handleAddButtonClick = async (formData) => {
		try {
			const urlImg = await handleUploadFile(formData.images);
			if (urlImg) {
				let updatedPerson = { ...formData, images: urlImg };
				await booksAdminApi.insert(updatedPerson);
				Toastify('success', 'Add success');
				onHide();
			}
		} catch (error) {
			Toastify('error', 'Add error');
			console.log(error);
		}
	};

	return (
		<Modal show={show} onHide={onHide}>
			<Modal.Header closeButton>
				<Modal.Title>Add book</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<AddForm handleAddButtonClick={handleAddButtonClick} />
			</Modal.Body>
		</Modal>
	);
};

export default Add;
