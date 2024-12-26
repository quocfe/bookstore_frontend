import _debounce from 'lodash/debounce';
import { useRef } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { searchBook } from '../../redux/apiRequest';
import './SearchForm.css';

const SearchForm = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const searchText = useRef('');

	const debouncedSearch = _debounce((query) => {
		searchBook(query, dispatch, navigate);
	}, 500);

	const handleSearch = async (e) => {
		e.preventDefault();
		const query = searchText.current.value;
		debouncedSearch(query);
	};

	return (
		<div className="search-form">
			<div className="container">
				<div className="search-form-content">
					<form className="search-form" method="get" onClick={handleSearch}>
						<div className="search-form-elem flex flex-sb bg-white">
							<input
								type="text"
								className="form-control"
								placeholder="search..."
								ref={searchText}
								onChange={handleSearch}
							/>
							<button type="submit" className="flex flex-c">
								<FaSearch className="text-purple" size={32} />
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default SearchForm;
