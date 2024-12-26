import React from 'react';
import BookList from '../../../components/BookList/BookList';
import Header from '../../../components/Header/Header';
// import { axiosClient } from '../../../api/config';

const Home = () => {
	return (
		<main>
			<Header />
			<BookList />
		</main>
	);
};

export default Home;
