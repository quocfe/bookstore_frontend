import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { Toastify } from '../../../../components/Toast/Toast';
import UpdateForm from './Form';

import './Update.css';
import categoryAdminApi from '../../../../api/admin/category';

const Update = ({ show, category, onHide }) => {
	const handleUpdateButtonClick = async (formData) => {
		try {
			const idCategory = category.idCategory;
			await categoryAdminApi.update(idCategory, formData);
			Toastify('success', 'Update success');
			onHide();
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
					category={category}
					handleUpdateButtonClick={handleUpdateButtonClick}
				/>
			</Modal.Body>
		</Modal>
	);
};

export default Update;
