import { useState } from 'react';
import Button from 'react-bootstrap/esm/Button';

const AddForm = ({ handleAddButtonClick }) => {
	const [formData, setFormData] = useState({
		nameCategory: '',
	});

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormData((prevFormData) => ({
			...prevFormData,
			[name]: value,
		}));
	};

	return (
		<form encType="multipart/form-data">
			<div className="form-group">
				<label htmlFor="nameCategory">Name Category</label>
				<input
					type="text"
					name="nameCategory"
					className="form-control"
					value={formData.nameCategory}
					onChange={handleChange}
				/>
				<span className="message text-danger"></span>
			</div>

			<Button
				className="mt-3"
				variant="primary"
				onClick={() => handleAddButtonClick(formData)}
			>
				Add
			</Button>
		</form>
	);
};

export default AddForm;
