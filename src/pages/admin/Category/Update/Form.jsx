import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/esm/Button';

const UpdateForm = ({ category, handleUpdateButtonClick }) => {
	const [formData, setFormData] = useState({
		nameCategory: '',
	});

	useEffect(() => {
		setFormData({
			nameCategory: category.nameCategory || '',
		});
	}, [category]);

	const handleChangeUpdate = (event) => {
		const { name, value } = event.target;
		setFormData((prevFormData) => ({
			...prevFormData,
			[name]: value,
		}));
	};

	return (
		<form id="form-update" encType="multipart/form-data">
			<div className="form-group">
				<label htmlFor="nameCategory">Name book</label>
				<input
					type="text"
					name="nameCategory"
					className="form-control"
					value={formData.nameCategory || ''}
					onChange={handleChangeUpdate}
				/>
				<span className="message text-danger"></span>
			</div>

			<Button
				className="mt-3"
				variant="primary"
				onClick={() => handleUpdateButtonClick(formData)}
			>
				Add
			</Button>
		</form>
	);
};

export default UpdateForm;
