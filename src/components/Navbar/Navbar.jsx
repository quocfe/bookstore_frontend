import React, { useState } from 'react';
import { HiOutlineMenuAlt3 } from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import logoImg from '../../images/logo.png';
import { logOut } from '../../redux/apiRequest';
import './Navbar.css';

const Navbar = () => {
	const [toggleMenu, setToggleMenu] = useState(false);
	const handleNavbar = () => setToggleMenu(!toggleMenu);
	const user = JSON.parse(localStorage.getItem('user'));
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleLogout = () => {
		logOut(dispatch, navigate);
	};

	return (
		<nav className="navbar" id="navbar">
			<div className="container navbar-content flex flex-nowrap">
				<div className="brand-and-toggler flex flex-sb">
					<Link to="/" className="navbar-brand flex">
						<img src={logoImg} alt="site logo" />
						<span className="text-uppercase fw-7 fs-24 ls-1">bookpoly</span>
					</Link>
					<button
						type="button"
						className="navbar-toggler-btn"
						onClick={handleNavbar}
					>
						<HiOutlineMenuAlt3
							size={35}
							style={{
								color: `${toggleMenu ? '#fff' : '#010101'}`,
							}}
						/>
					</button>
				</div>

				<div
					className={
						toggleMenu ? 'navbarCollapse show-navbarCollapse' : 'navbarCollapse'
					}
				>
					<ul className="navbar-nav">
						<li className="nav-item">
							<Link to="/" className="nav-link text-uppercase  fs-22 fw-6 ls-1">
								Home
							</Link>
						</li>
						<li className="nav-item">
							<Link
								to="/review"
								className="nav-link text-uppercase  fs-22 fw-6 ls-1"
							>
								Review
							</Link>
						</li>
						{user ? (
							<>
								<li className="nav-item">
									<Link
										to={user?.isAdmin ? '/admin' : ''}
										className="nav-link text-uppercase  fs-22 fw-6 ls-1"
									>
										{user.username}
									</Link>
								</li>
								<li className="nav-item cursor-pointer" onClick={handleLogout}>
									<Link className="nav-link text-uppercase fs-22 fw-6 ls-1">
										Log out
									</Link>
								</li>
							</>
						) : (
							<>
								<li className="nav-item">
									<Link
										to="/signin"
										className="nav-link text-uppercase  fs-22 fw-6 ls-1"
									>
										Sign In
									</Link>
								</li>
								<li className="nav-item">
									<Link
										to="/signup"
										className="nav-link text-uppercase  fs-22 fw-6 ls-1"
									>
										Sign Up
									</Link>
								</li>
							</>
						)}
					</ul>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
