import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { Link, useNavigate } from 'react-router-dom';
import categoryAdminApi from '../../../../api/admin/category';
import Layout from '../../Layout/Layout';
import Add from '../Add/Add';
import Update from '../Update/Update';
import './View.css';
import { Toastify } from '../../../../components/Toast/Toast';

const ViewCate = () => {
	const navigate = useNavigate();
	const [categorys, setCategorys] = useState([]);
	const [showAddForm, setShowAddForm] = useState(false);
	const [showEditForm, setShowEditForm] = useState(false);
	const [selectedCategory, setSelectedCategory] = useState(null);

	const handleShowAddForm = () => setShowAddForm(true);
	const handleCloseAddForm = () => setShowAddForm(false);

	const handleShowEditForm = (category) => {
		setSelectedCategory(category);
		setShowEditForm(true);
	};
	const handleCloseEditForm = () => setShowEditForm(false);

	const handleDelete = async (id) => {
		const newCates = categorys.filter((category) => category.idCategory != id);
		if (newCates) {
			await categoryAdminApi.delete(id);
			setCategorys(newCates);
			Toastify('success', 'Delete success');
			navigate('/admin/category');
		}
	};

	useEffect(() => {
		async function fetchData() {
			try {
				const response = await categoryAdminApi.getAll();
				console.log(response);
				if (response.status === 200) {
					setCategorys(response.data);
				}
			} catch (error) {
				console.log(error);
			}
		}
		fetchData();
	}, []);

	return (
		<Layout>
			<div className="container">
				<div className="row mb-4">
					<Button variant="primary" onClick={handleShowAddForm}>
						Add category
					</Button>
					<Add show={showAddForm} onHide={handleCloseAddForm} />
				</div>
				<div className="row">
					<table className="table">
						<thead>
							<tr className="text-center align-middle">
								<th scope="col">#</th>
								<th scope="col">Tên danh mục</th>
								<th>
									<i className="fa-regular fa-pen-to-square"></i>
								</th>
								<th>
									<i className="fa-solid fa-trash-can"></i>
								</th>
							</tr>
						</thead>
						<tbody>
							{categorys?.map(({ idCategory, nameCategory }) => {
								return (
									<tr key={nameCategory} className="text-center align-middle">
										<td>{idCategory || 'null'}</td>
										<td>{nameCategory || 'null'}</td>
										<td>
											<Button
												variant="primary"
												onClick={() => {
													handleShowEditForm({
														idCategory,
														nameCategory,
													});
												}}
											>
												Edit product
											</Button>
											<Update
												show={showEditForm}
												category={selectedCategory}
												onHide={handleCloseEditForm}
											/>
										</td>
										<td>
											<Link to={`/admin/category/${idCategory}`}>
												<button
													onClick={() => handleDelete(idCategory)}
													className="btn btn-danger w-100 "
												>
													Xóa
												</button>
											</Link>
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
			</div>
		</Layout>
	);
};

export default ViewCate;
