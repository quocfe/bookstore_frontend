import { useEffect, useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { Link, useNavigate, useParams } from 'react-router-dom';
import booksApi from '../../../api/client/books';
import Header from './../../../components/Header/Header';
import SeeMore from './../../../components/SeeMore/SeeMore';
import './BookDetails.css';
import SlideShow from './component/SlideShow/SlideShow';

const BookDetails = () => {
	const { id } = useParams();
	const [book, setBook] = useState([]);
	const [bookType, setBookType] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const bookResponse = await booksApi.getOne(id);
				setBook(bookResponse.data);
				const booksType = await booksApi.getByNameCate(
					bookResponse.data[0].idCategory
				);
				const booksTypeFilter = booksType.data.filter(
					(item) => item.idProduct != id
				);
				setBookType(booksTypeFilter);
			} catch (error) {
				console.log(error);
			}
		};
		fetchData();
	}, [id]);

	const createMarkup = () => {
		return { __html: book[0]?.sortDescription };
	};

	return (
		<>
			<Header />
			<section className="book-details">
				<div className="container ">
					<button
						type="button"
						className="flex flex-c back-btn"
						onClick={() => navigate('/')}
					>
						<FaArrowLeft size={22} />
						<span className="fs-18 fw-6">Go Back</span>
					</button>
					<div className="row">
						<div className="book-details-content grid ">
							<div className="book-details-img">
								<img src={book[0]?.images} alt="cover img" />
							</div>
							<div className="book-details-info">
								<div className="book-details-item title">
									<span className="fw-6 fs-24">{book[0]?.nameProduct}</span>
								</div>
								<div className="book-details-item description">
									<div dangerouslySetInnerHTML={createMarkup()} />
								</div>
								<div className="book-details-item">
									<span className="fw-6">Author: </span>
									<span className="text-italic">{book[0]?.authorProduct}</span>
								</div>
								<div className="book-details-item">
									<span className="fw-6">Publish year: </span>
									<span className="text-italic">{book[0]?.year}</span>
								</div>
								<div className="book-details-item">
									<span className="fw-6">Isbn:</span>
									<span> {book[0]?.isbn}</span>
								</div>
								<Link
									to={`/review/${book[0]?.idProduct}`}
									className="btn btn-primary btnShowReview"
								>
									Xem review
								</Link>
							</div>
						</div>
					</div>
					<div className="row  book-description ">
						<div className="title mb-0">
							<span className="fw-6 fs-24">Mô tả</span>
						</div>
						<div className="col-lg-12 description-text">
							<SeeMore text={book[0]?.description} />
						</div>
					</div>

					<div className="row rating-review">
						<div className="title mb-3">
							<span className="fw-6 fs-24">Sách cùng loại</span>
						</div>
						<div className="row">
							<div className="col-lg-12 ">
								<SlideShow items={bookType} />
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default BookDetails;
