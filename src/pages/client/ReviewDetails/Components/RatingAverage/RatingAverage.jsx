import React, { useEffect, useState } from 'react';
import Star from '../../../BookDetails/component/Star/Star';
import './RatingAverage.css';
import commentsApi from '../../../../../api/client/comments';
import { isNumber } from 'lodash';

const RatingAverage = ({ idReview, totalComments }) => {
	const [comments, setComments] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await commentsApi.getAll();
				setComments(response.data);
			} catch (error) {
				console.log(error);
			}
		};
		fetchData();
	}, [totalComments]);

	const filterComment = comments.filter(
		(comment) => comment.idReview == idReview
	);

	let average = () => {
		const initialValue = 0;
		const sum = filterComment.reduce(
			(accumulator, currentValue) => accumulator + currentValue.rating,
			initialValue
		);

		let averageRating = sum / totalComments;

		if (isNaN(averageRating)) {
			return (averageRating = 0);
		} else {
			return averageRating.toFixed(0);
		}
	};

	return (
		<div className="containerCustom shadow py-5 rounded-3">
			<div className="row">
				<div className="col-lg-12">
					<div className="row">
						<div className="col-sm-6 text-center d-flex flex-column justify-content-center align-center ">
							<p className="fs-1 mb-0">
								{average() != '0' ? average() : '0'}/5
							</p>
							<Star rating={average()} />
							<p>({totalComments ? totalComments : 0} đánh giá)</p>
						</div>

						<div className="col-sm-6">
							{[5, 4, 3, 2, 1].map((rating) => (
								<div key={rating} className="d-flex align-center gap-2">
									<Star rating={rating} />
									<p className="mb-0">
										(
										{
											filterComment.filter(
												(comment) => comment.rating === rating
											).length
										}
										)
									</p>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default RatingAverage;
