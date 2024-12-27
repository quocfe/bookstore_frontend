import { useEffect, useState, useCallback } from 'react';
import reviewApi from '../../../api/client/review';
import GoToTopButton from '../../../components/GoToTopButton/GoToTopButton';
import InfiniteScroll from '../../../components/InfiniteScroll/InfiniteScroll';
import Navbar from '../../../components/Navbar/Navbar';
import './Review.css';
import ReviewCard from './components/ReviewCard';

const Review = () => {
	const [reviews, setReviews] = useState([]);
	const [reviewsTop5, setReviewsTop5] = useState([]);
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(0);

	// Load reviews (initial and more)
	const fetchReviews = useCallback(async (page = 1, append = false) => {
		try {
			const response = await reviewApi.getAll(page, 5);
			const newReviews = response.data.data;
			setReviews((prevReviews) =>
				append ? [...prevReviews, ...newReviews] : newReviews
			);
			setTotalPages(response.data.pagination.totalPage);
		} catch (error) {
			console.error('Error fetching reviews:', error);
		}
	}, []);

	// Load top 5 reviews
	const fetchTop5Reviews = useCallback(async () => {
		try {
			const response = await reviewApi.getTop5();
			setReviewsTop5(response.data);
		} catch (error) {
			console.error('Error fetching top 5 reviews:', error);
		}
	}, []);

	// Initial data load
	useEffect(() => {
		fetchReviews(1);
		fetchTop5Reviews();
	}, [fetchReviews, fetchTop5Reviews]);

	// Load more reviews when page changes
	useEffect(() => {
		if (page > 1) {
			fetchReviews(page, true);
		}
	}, [page, fetchReviews]);

	return (
		<>
			<Navbar />
			<GoToTopButton />
			<div className="container mt-5" id="review">
				<div className="row gap-5">
					{/* Main review section */}
					<div className="col-lg-8">
						<div className="row head">
							<div className="col-sm-3">Review</div>
						</div>
						<InfiniteScroll
							loader={<p>Loading...</p>}
							className="row mt-5 gap-4"
							fetchMore={() => setPage((prev) => prev + 1)}
							hasMore={page < totalPages}
							endMessage={<p>You have seen it all</p>}
						>
							{reviews.map((review, index) => (
								<ReviewCard type="large" key={index} {...review} />
							))}
						</InfiniteScroll>
					</div>

					{/* Top 5 reviews section */}
					<div className="col-lg-3">
						<div className="row head">
							<p>Top 5 xem nhiều</p>
						</div>
						<div className="row gap-4 mt-5">
							{reviewsTop5.map((review, index) => (
								<ReviewCard type="small" key={index} {...review} />
							))}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Review;
