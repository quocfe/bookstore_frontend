import _, { orderBy } from 'lodash';
import React, { useEffect, useState } from 'react';
import reviewApi from '../../../api/client/review';
import InfiniteScroll from '../../../components/InfiniteScroll/InfiniteScroll';
import Navbar from './../../../components/Navbar/Navbar';
import Pagination from './../../../components/Paginate/Paginate';
import './Review.css';
import ReviewItem from './components/Reviewitem';
import Loader from './../../../components/Loader/Loader';
import GoToTopButton from '../../../components/GoToTopButton/GoToTopButton';

const Review = () => {
	const [reviews, setReviews] = useState([]);
	const [reviewsSort, setReviewsSort] = useState([]);
	const [page, setPage] = useState(1);
	const [totalRows, setTotalRows] = useState(0);

	useEffect(() => {
		const fetchData = async () => {
			const response = await reviewApi.getAll(1, 100);
			const reviewData = await Promise.all(
				response.data.data.map(async ({ idProduct }) => {
					const { data } = await reviewApi.selectByProduct(idProduct);
					return data[0];
				})
			);
			const reviewSort = orderBy(reviewData, ['view'], ['desc']);
			const reviewTop5 = _.take(reviewSort, 5);
			setReviewsSort(reviewTop5);
		};

		fetchData();
	}, []);

	useEffect(() => {
		const fetchData = async () => {
			const response = await reviewApi.getAll(page, 4);
			const reviewData = await Promise.all(
				response.data.data.map(async ({ idProduct }) => {
					const { data } = await reviewApi.selectByProduct(idProduct);
					return data[0];
				})
			);

			setReviews([...reviews, ...reviewData]);
			setTotalRows(response.data.pagination.totalPage);
		};
		fetchData();
	}, [page]);

	return (
		<>
			<Navbar />
			<GoToTopButton />

			<div className="container mt-5" id="review">
				<div className="row gap-5">
					<div className="col-lg-8 ">
						<div className="row head">
							<div className="col-sm-3">Review</div>
						</div>
						<InfiniteScroll
							loader={<p>Loading...</p>}
							className="row mt-5 gap-4"
							fetchMore={() => setPage((prev) => prev + 1)}
							hasMore={page < totalRows}
							endMessage={<p>You have seen it all</p>}
						>
							{reviews?.map((review) => (
								<ReviewItem type="large" key={review.idReview} {...review} />
							))}
						</InfiniteScroll>
					</div>
					<div className="col-lg-3">
						<div className="row head">
							<p>Top 5 xem nhiều</p>
						</div>
						<div className="row gap-4 mt-5">
							{reviewsSort?.map((review) => (
								<ReviewItem type="small" key={review.idReview} {...review} />
							))}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Review;
