import { orderBy } from 'lodash';
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import booksAdminApi from '../../../../api/admin/books';
import { Toastify } from '../../../../components/Toast/Toast';
import Layout from '../../Layout/Layout';
import Add from '../Add/Add';
import Update from '../Update/Update';
import './View.css';
import Pagination from '../../../../components/Paginate/Paginate';

const View = () => {
	const [books, setBooks] = useState([]);
	const [showAddForm, setShowAddForm] = useState(false);
	const [showEditForm, setShowEditForm] = useState(false);
	const [selectedBook, setSelectedBook] = useState(null);
	const [page, setPage] = useState(1);
	const [pagination, setPagination] = useState({});

	const handleShowAddForm = (book) => setShowAddForm(true);
	const handleCloseAddForm = () => setShowAddForm(false);

	const handleShowEditForm = (book) => {
		setSelectedBook(book);
		setShowEditForm(true);
	};
	const handleCloseEditForm = () => setShowEditForm(false);

	const handleDelete = async (id) => {
		const newBooks = books.filter((book) => book.idProduct != id);
		if (newBooks) {
			await booksAdminApi.delete(id);
			setBooks(newBooks);
			Toastify('success', 'Delete success');
		}
	};

	useEffect(() => {
		async function fetchData() {
			try {
				const response = await booksAdminApi.getAll(page, 5);
				if (response.status === 200) {
					setPagination(response.data.pagination);
					const sortedBooks = orderBy(
						response.data.data,
						['createAt'],
						['desc']
					);
					console.log('sortedBooks', sortedBooks);
					setBooks(sortedBooks);
				}
			} catch (error) {
				console.log(error);
			}
		}
		fetchData();
	}, [page]);

	const handlePageClick = ({ selected }) => {
		setPage(selected + 1);
	};

	return (
		<Layout>
			<div className="container">
				<div className="row mb-4">
					<Button variant="primary" onClick={handleShowAddForm}>
						Add product
					</Button>
					<Add show={showAddForm} onHide={handleCloseAddForm} />
				</div>
				<div className="row">
					<table className="table">
						<thead>
							<tr className="text-center align-middle">
								<th scope="col">#</th>
								<th scope="col">Tên sách</th>
								<th scope="col">Tác giả</th>
								<th scope="col">Isbn</th>
								<th scope="col">Year</th>
								<th>
									<i className="fa-regular fa-pen-to-square"></i>
								</th>
								<th>
									<i className="fa-solid fa-trash-can"></i>
								</th>
							</tr>
						</thead>
						<tbody>
							{books?.map(
								({
									idProduct,
									nameProduct,
									authorProduct,
									sortDescription,
									description,
									priceProduct,
									images,
									year,
									isbn,
									idCategory,
								}) => {
									return (
										<tr key={idProduct} className="text-center align-middle">
											<td>{idProduct || 'null'}</td>
											<td>{nameProduct || 'null'}</td>
											<td>{authorProduct || 'null'}</td>
											<td>{isbn || 'null'}</td>
											<td>{year || 'null'}</td>
											<td>
												<Button
													variant="primary"
													onClick={() => {
														handleShowEditForm({
															idProduct,
															nameProduct,
															authorProduct,
															sortDescription,
															description,
															priceProduct,
															images,
															year,
															isbn,
															idCategory,
														});
													}}
												>
													Edit product
												</Button>
												<Update
													show={showEditForm}
													book={selectedBook}
													onHide={handleCloseEditForm}
												/>
											</td>
											<td>
												<Link to={`/admin/book/${idProduct}`}>
													<button
														onClick={() => handleDelete(idProduct)}
														className="btn btn-danger w-100 "
													>
														Xóa
													</button>
												</Link>
											</td>
										</tr>
									);
								}
							)}
						</tbody>
					</table>
					<Pagination
						pageCount={pagination.totalPage}
						handlePageClick={handlePageClick}
					/>
				</div>
			</div>
		</Layout>
	);
};

export default View;
