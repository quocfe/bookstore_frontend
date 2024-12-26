import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { Toastify } from './../../../../components/Toast/Toast';
import './Add.css';
import AddForm from './Form';
import reviewApi from './../../../../api/client/review';

const Add = ({ show, onHide }) => {
	const handleAddButtonClick = async (formData) => {
		try {
			await reviewApi.insert(formData);
			Toastify('success', 'Add success');
			onHide();
		} catch (error) {
			Toastify('error', 'Add error');
			console.log(error);
		}
	};

	return (
		<Modal show={show} onHide={onHide}>
			<Modal.Header closeButton>
				<Modal.Title>Add</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<AddForm handleAddButtonClick={handleAddButtonClick} />
			</Modal.Body>
		</Modal>
	);
};

export default Add;
