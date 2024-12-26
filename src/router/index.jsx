import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import View from '../pages/admin/Books/View/View';
import ViewCate from '../pages/admin/Category/View/View';
import Dashboad from '../pages/admin/Dashboad/Dashboad';
import ViewReview from '../pages/admin/Review/View/View';
import SignIn from '../pages/client/Auth/SignIn/SignIn';
import SignUp from '../pages/client/Auth/SignUp/SignUp';
import Home from '../pages/client/Home/Home';
import Review from '../pages/client/Review/Review';
import BookDetails from './../pages/client/BookDetails/BookDetails';
import PrivateRoute from './PrivateRoute';
import ReviewDetails from '../pages/client/ReviewDetails/ReviewDetails';
import PrivateRouteAdmin from './PrivateRouteAdmin';

const RoutesManage = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/signin" element={<SignIn />} />
				<Route path="/signup" element={<SignUp />} />
				<Route element={<PrivateRoute />}>
					<Route path="/" element={<Home />} />
					<Route path="/book/:id" element={<BookDetails />} />
					<Route path="/review" element={<Review />} />
					<Route path="/review/:id" element={<ReviewDetails />} />
				</Route>
				<Route element={<PrivateRouteAdmin />}>
					<Route path="/admin" element={<Dashboad />} />
					<Route path="/admin/book" element={<View />} />
					<Route path="/admin/book/:id" element={<View />} />
					<Route path="/admin/add/book" element={<View />} />
					<Route path="/admin/category" element={<ViewCate />} />
					<Route path="/admin/category/:id" element={<ViewCate />} />
					<Route path="/admin/review" element={<ViewReview />} />
					<Route path="/admin/review/:id" element={<ViewReview />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
};

export default RoutesManage;
