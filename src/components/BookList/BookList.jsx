import { useEffect, useRef, useState } from 'react';
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
	const [cateSelect, setCateSelect] = useState(0);
	const [totalPage, setTotalPage] = useState(0);
	const cateRef = useRef();
	const books = useSelector((state) => state.books.data);

	// Fetch categories once on component mount
	useEffect(() => {
		const fetchCategories = async () => {
			try {
				const response = await categoryApi.getAll();
				setCategories(response.data);
			} catch (error) {
				console.error('Error fetching categories:', error);
			}
		};
		fetchCategories();
	}, []);

	// Fetch books (by category or pagination)
	useEffect(() => {
		const fetchBooks = async () => {
			try {
				if (cateSelect === 0) {
					const response = await booksApi.getAll(currentPage, 8);
					setDataBook(response.data.data);
					setTotalPage(response.data.pagination.totalPage);
				} else {
					const response = await booksApi.getByNameCate(cateSelect);
					setDataBook(response.data);
					setTotalPage(1); // Nếu không phân trang cho sách theo category
				}
			} catch (error) {
				console.error('Error fetching books:', error);
			}
		};

		fetchBooks();
	}, [currentPage, cateSelect]);

	// Handle page change
	const handlePageClick = ({ selected }) => {
		setCurrentPage(selected + 1);
	};

	// Handle category selection
	const handleSelect = (event) => {
		const tagCate = event.target.innerText;
		const idCate = event.target.dataset.id;
		cateRef.current.innerText = tagCate;
		setCateSelect(Number(idCate));
		setCurrentPage(1); // Reset về trang đầu khi đổi category
	};

	// Update books from Redux store if available
	useEffect(() => {
		if (books.length > 8) {
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
						<h1>No matching results!</h1>
					)}
				</div>
			</div>
		</section>
	);
};

export default BookList;
