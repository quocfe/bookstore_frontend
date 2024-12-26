import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Navbar from '../../../components/Navbar/Navbar';
import reviewApi from '../../../api/client/review';
import './ReviewDetails.css';
import StarRating from './../../../components/StarRating/StarRating';
import Comments from './Components/Comments/Comments';
import FormComment from './Components/FormComment/FormComment';
import RatingAverage from './Components/RatingAverage/RatingAverage';
import GoToTopButton from './../../../components/GoToTopButton/GoToTopButton';

const ReviewDetails = () => {
	const { id } = useParams();
	const [review, setReview] = useState({});
	const [totalComments, setTotalComments] = useState(0);

	useEffect(() => {
		const fetchData = async () => {
			try {
				await reviewApi.updateView(id);
				const response = await reviewApi.getOne(id);
				setReview(response.data[0]);
			} catch (error) {
				console.error(error);
			}
		};

		fetchData();
	}, [id]);

	const createMarkup = (text) => {
		return { __html: text };
	};

	return (
		<>
			<Navbar />
			<div className="container" id="reviewDetails">
				<GoToTopButton />
				<Link to="/review">
					<button
						type="button"
						className="flex flex-c back-btn"
						fdprocessedid="480q88"
					>
						<svg
							stroke="currentColor"
							fill="currentColor"
							strokeWidth={0}
							viewBox="0 0 448 512"
							height={22}
							width={22}
							xmlns="http://www.w3.org/2000/svg"
						>
							<path d="M257.5 445.1l-22.2 22.2c-9.4 9.4-24.6 9.4-33.9 0L7 273c-9.4-9.4-9.4-24.6 0-33.9L201.4 44.7c9.4-9.4 24.6-9.4 33.9 0l22.2 22.2c9.5 9.5 9.3 25-.4 34.3L136.6 216H424c13.3 0 24 10.7 24 24v32c0 13.3-10.7 24-24 24H136.6l120.5 114.8c9.8 9.3 10 24.8.4 34.3z" />
						</svg>
						<span className="fs-22 fw-6">Go Back</span>
					</button>
				</Link>

				<div className="row ">
					<div className="col-lg-12">
						<div dangerouslySetInnerHTML={createMarkup(review.content)}></div>
					</div>
				</div>
				<div className="row mb-5">
					<div className="col-lg-12">
						<div className=" shadow px-5 py-3 mb-5 bg-body rounded">
							<div className="title mb-3">
								<span className="fw-6 fs-24">
									Bình luận/Đánh giá <strong>({totalComments})</strong>
								</span>
							</div>
							<RatingAverage idReview={id} totalComments={totalComments} />
							<FormComment idProduct={review.idProduct} idReview={id} />
							<Comments
								totalComments={setTotalComments}
								idReview={id}
								idProduct={review.idProduct}
							/>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default ReviewDetails;
