import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import StarRating from '../../../../../components/StarRating/StarRating';
import { addComment } from '../../../../../redux/commentSlice';
import commentsApi from './../../../../../api/client/comments';
import './FormComment.css';

const getCurrentDay = () => {
	const currentDate = new Date();
	const day = String(currentDate.getDate()).padStart(2, '0');
	const month = String(currentDate.getMonth() + 1).padStart(2, '0');
	const year = currentDate.getFullYear();
	return `${year}-${month}-${day}T${currentDate
		.toISOString()
		.slice(11, 19)}.000Z`;
};

const FormComment = ({ idProduct, idReview }) => {
	const userCurrent = JSON.parse(localStorage.getItem('user'));
	const dispatch = useDispatch();

	const [comment, setComment] = useState({
		content: '',
		rating: 1,
		idUser: userCurrent.id,
		idReview: +idReview,
		idProduct: idProduct,
	});

	useEffect(() => {
		if (idProduct !== undefined) {
			setComment((prev) => ({ ...prev, idProduct: idProduct }));
		}
	}, [idProduct, idReview]);

	const onRatingChange = (data = 1) => {
		setComment((prev) => ({ ...prev, rating: data }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (comment.content.trim() === '') {
			alert('Vui lòng nhập nội dung!');
			return;
		}

		try {
			await commentsApi.insert(comment);
			const cloneComment = {
				...comment,
				username: userCurrent.username,
				createAt: getCurrentDay(),
			};

			dispatch(addComment(cloneComment));

			setComment({
				content: '',
				rating: 1,
				idUser: userCurrent.id,
				idReview: +idReview,
				idProduct: +idProduct,
			});

			onRatingChange(1);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className="container" id="form-comment">
			<div className="row px-5 py-3 mb-5 mt-5">
				<div className="col-lg-12">
					<form>
						<div className="form-group">
							<textarea
								className="border w-100"
								type="text"
								placeholder="comment..."
								value={comment.content}
								onChange={(e) =>
									setComment((prev) => ({ ...prev, content: e.target.value }))
								}
							/>
							<StarRating onRatingChange={onRatingChange} />
						</div>
						<button
							className="btn btn-primary w-25"
							type="submit"
							onClick={handleSubmit}
						>
							Comment
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default FormComment;
