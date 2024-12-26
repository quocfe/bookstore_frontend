import React from 'react';
import { Link } from 'react-router-dom';
import './BookList.css';

const Book = ({ idProduct, nameProduct, authorProduct, images, year }) => {
	return (
		<div className="book-item flex flex-column flex-sb">
			<div className="book-item-img">
				<img src={images} alt="" />
			</div>
			<div className="book-item-info text-center">
				<Link to={`/book/${idProduct}`}>
					<div className="book-item-info-item title fw-7 fs-18">
						{nameProduct}
					</div>
				</Link>

				<div className="book-item-info-item author  fs-15">
					<span className="text-capitalize fw-7">Author:</span>
					<span>{authorProduct}</span>
				</div>

				<div className="book-item-info-item publish-year fs-15">
					<span className="text-capitalize fw-7">Publish year:</span>
					<span>{year}</span>
				</div>
			</div>
		</div>
	);
};

export default Book;
