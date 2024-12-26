import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/esm/Button';
import booksApi from './../../../../api/client/books';

const AddForm = ({ handleAddButtonClick }) => {
	const { id } = JSON.parse(localStorage.getItem('user'));

	const [cateBooks, setCateBooks] = useState([]);
	const [formData, setFormData] = useState({
		content: '',
		idProduct: '',
		idUser: id.toString(),
	});

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await booksApi.getAll(1, 100);
				setCateBooks(response.data.data);
			} catch (error) {
				console.log(error);
			}
		};

		fetchData();
	}, []);

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
				<label htmlFor="content">Content</label>
				<CKEditor
					editor={ClassicEditor}
					data={formData.content}
					onReady={(editor) => {}}
					onChange={(event, editor) => {
						const data = editor.getData();
						setFormData((prevFormData) => ({
							...prevFormData,
							content: data,
						}));
					}}
				/>
			</div>
			<div className="form-group">
				<label htmlFor="book">Sách</label>
			</div>
			<select
				className="form-select"
				aria-label="category"
				name="idProduct"
				value={formData.idProduct}
				onChange={handleChange}
			>
				<option>Sách</option>
				{cateBooks?.map(({ idProduct, nameProduct }) => (
					<option key={idProduct} value={idProduct}>
						{nameProduct}
					</option>
				))}
			</select>
			<Button
				className="mt-5"
				variant="primary"
				onClick={() => handleAddButtonClick(formData)}
			>
				Add
			</Button>
		</form>
	);
};

export default AddForm;
