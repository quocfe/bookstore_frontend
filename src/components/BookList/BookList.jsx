import React, { useEffect, useRef, useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import booksApi from '../../api/client/books';
import Pagination from '../Paginate/Paginate';
import categoryApi from './../../api/client/category';
import Book from './Book';
import './BookList.css';

const BookList = () => {
	const [categories, setCategories] = useState([]);
	const [dataBook, setDataBook] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [currentLimit, setCurrentLimit] = useState(8);
	const [cateSelect, setCateSelect] = useState(0);
	const [totalPage, setTotalPage] = useState();
	const cateRef = useRef();
	const books = useSelector((state) => state.books.data);

	useEffect(() => {
		const fetchCategories = async () => {
			try {
				const response = await categoryApi.getAll();
				setCategories(response.data);
			} catch (error) {
				console.log(error);
			}
		};
		fetchCategories();
	}, []);

	const fetchBooks = async () => {
		try {
			const response = await booksApi.getAll(currentPage, currentLimit);
			setDataBook(response.data.data);
			setTotalPage(response.data.pagination.totalPage);
		} catch (error) {
			console.log(error);
		}
	};

	const fetchBooksByCategory = async () => {
		try {
			const response = await booksApi.getByNameCate(cateSelect);
			setDataBook(response.data);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchBooks();
	}, [currentPage, currentLimit]);

	useEffect(() => {
		if (cateSelect === 0) {
			fetchBooks();
		} else {
			fetchBooksByCategory();
		}
	}, [cateSelect]);

	const handlePageClick = ({ selected }) => {
		setCurrentPage(selected + 1);
	};

	const handleSelect = (event) => {
		const tagCate = event.target.innerText;
		const idCate = event.target.dataset.id;
		cateRef.current.innerText = tagCate;
		setCateSelect(+idCate);
	};

	useEffect(() => {
		if (books.length > 8) {
			fetchBooks();
		} else {
			setDataBook(books);
		}
	}, [books]);

	return (
		<section className="booklist">
			<div className="container">
				<div className="row align-items-center justify-content-between">
					<div className="col-lg-6">
						<div className="row align-items-center">
							<div className="section-title col-sm-3">
								<h2>Books</h2>
							</div>
							<Dropdown
								onSelect={() => handleSelect(event)}
								className="col-sm-9"
							>
								<Dropdown.Toggle
									ref={cateRef}
									variant="primary"
									id="dropdown-basic"
								>
									Categories
								</Dropdown.Toggle>
								<Dropdown.Menu>
									<Dropdown.Item data-id={0}>All</Dropdown.Item>
									{categories.map((category) => (
										<Dropdown.Item
											key={category.idCategory}
											data-id={category.idCategory}
										>
											{category.nameCategory}
										</Dropdown.Item>
									))}
								</Dropdown.Menu>
							</Dropdown>
						</div>
					</div>
					<div className="col-lg-6 pagination-container">
						<Pagination
							pageCount={totalPage}
							handlePageClick={handlePageClick}
						/>
					</div>
				</div>
				<div className="booklist-content grid">
					{dataBook.length > 0 ? (
						dataBook.map((item, index) => <Book key={index} {...item} />)
					) : (
						<h1>Kết quả không khớp!</h1>
					)}
				</div>
			</div>
		</section>
	);
};

export default BookList;
