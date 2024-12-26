import React, { useState } from 'react';
import Star from '../../../BookDetails/component/Star/Star';
import './CommentItem.css';
import commentsApi from './../../../../../api/client/comments';
import { useDispatch } from 'react-redux';
import { fetchComment } from '../../../../../redux/apiRequest';

const CommentItem = ({ comment, idProduct }) => {
	const [show, setShow] = useState(false);
	const user = JSON.parse(localStorage.getItem('user'));
	const dispatch = useDispatch();

	const generationDate = (datetimeString) => {
		let time;
		let dateTime = new Date(datetimeString);
		time = `${dateTime.getDate()}-${
			dateTime.getMonth() + 1
		}-${dateTime.getFullYear()}`;
		return time;
	};

	async function handleDelete(id) {
		try {
			const response = await commentsApi.getAllByIdProduct(idProduct);
			let commentArr = response.data.sort(
				(a, b) => b.idcomments - a.idcomments
			);
			let idDetele = id === undefined ? commentArr[0].idcomments : id;
			await commentsApi.delete(idDetele);
			fetchComment(idProduct, dispatch);
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<div
			key={comment?.idcomments}
			className="row px-5 py-3 mb-5 mt-5 bg-body rounded"
		>
			<div className="col-lg-1">
				<img
					src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(23).webp"
					className="rounded-circle shadow-1-strong me-3"
				/>
			</div>
			<div className="col-lg-11">
				<div className="row mb-3">
					<div className="col-sm-6">
						<div className="d-flex align-items-center gap-4">
							<p className="mb-0">{comment?.username}</p>
							{user?.id === comment?.idUser ? (
								<div className="dots-three" onClick={() => setShow(!show)}>
									<i className="fa-solid fa-ellipsis"></i>
									<div
										onClick={() => handleDelete(comment?.idcomments)}
										className={show ? 'delete-div show' : 'delete-div'}
									>
										<p>Xóa</p>
									</div>
								</div>
							) : (
								''
							)}
						</div>
					</div>
					<div className="col-sm-6">
						<p className="text-end">{generationDate(comment?.createAt)}</p>
					</div>
				</div>
				<div className=" mb-3 h-100">
					<p className="bg-light p-4">{comment?.content}</p>
					<Star rating={comment?.rating} />
				</div>
			</div>
		</div>
	);
};

export default CommentItem;
