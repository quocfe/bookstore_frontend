import React from 'react';
import Nav from '../Nav/Nav';
import './Layout.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Layout = ({ children }) => {
	return (
		<>
			<ToastContainer />
			<div className="admin" id="admin">
				<div className="adminLayout">
					<Nav />
					<div className="adminMain">
						<div className="content">{children}</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Layout;
