import orderBy from 'lodash/orderBy';
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Layout from '../../Layout/Layout';
import Add from '../Add/Add';
import reviewAdminApi from './../../../../api/admin/review';
import Pagination from './../../../../components/Paginate/Paginate';
import { generationDate } from './../../../../helper/generationDate';
import './View.css';
import { Toastify } from '../../../../components/Toast/Toast';

const ViewReview = () => {
	const [reviews, setReviews] = useState([]);
	const [showAddForm, setShowAddForm] = useState(false);
	const [showEditForm, setShowEditForm] = useState(false);
	const [selectedReview, setSelectedReview] = useState(null);
	const [page, setPage] = useState(1);
	const [pagination, setPagination] = useState({});

	const handleShowAddForm = (book) => setShowAddForm(true);
	const handleCloseAddForm = () => setShowAddForm(false);

	const handleShowEditForm = (book) => {
		setSelectedReview(book);
		setShowEditForm(true);
	};
	const handleCloseEditForm = () => setShowEditForm(false);

	useEffect(() => {
		const fetchData = async () => {
			const response = await reviewAdminApi.getAll(page, 5);
			setPagination(response.data.pagination);
			if (response.status === 200) {
				const sortedReviews = orderBy(
					response.data.data,
					['createAt'],
					['desc']
				);
				setReviews(sortedReviews);
			}
		};

		fetchData();
	}, [page]);

	const handlePageClick = ({ selected }) => {
		setPage(selected + 1);
	};

	const handleDelete = async (id) => {
		const newReview = reviews.filter((review) => review.idReview != id);
		if (newReview) {
			await reviewAdminApi.delete(id);
			setReviews(newReview);
			Toastify('success', 'Delete success');
		}
	};

	return (
		<Layout>
			<div className="container" id="viewReview">
				<div className="row mb-4">
					<Button variant="primary" onClick={handleShowAddForm}>
						Add review
					</Button>
					<Add show={showAddForm} onHide={handleCloseAddForm} />
				</div>
				<div className="row">
					<table className="table">
						<thead>
							<tr className="text-center align-middle">
								<th scope="col">Id sách</th>
								<th scope="col">Id tác giả</th>
								<th scope="col">Ngày đăng</th>
								<th>
									<i className="fa-regular fa-pen-to-square"></i>
								</th>
								<th>
									<i className="fa-solid fa-trash-can"></i>
								</th>
							</tr>
						</thead>
						<tbody>
							{reviews?.map(
								({ idReview, idProduct, idUser, content, createAt }) => {
									return (
										<tr key={idReview} className="text-center align-middle">
											<td>{idProduct || 'null'}</td>
											<td>{idUser || 'null'}</td>
											<td>{generationDate(createAt) || 'null'}</td>
											<td>
												<Button
													variant="primary"
													onClick={() => {
														handleShowEditForm();
													}}
												>
													Edit review
												</Button>
												{/* <Update
										show={showEditForm}
										book={selectedReview}
										onHide={handleCloseEditForm}
									/> */}
											</td>
											<td>
												<Link to={`/admin/review/${idReview}`}>
													<button
														onClick={() => handleDelete(idReview)}
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

export default ViewReview;
