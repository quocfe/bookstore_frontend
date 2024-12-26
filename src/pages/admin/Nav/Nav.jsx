import React from 'react';
import './Nav.css';
import { Link } from 'react-router-dom';

const Nav = () => {
	return (
		<div className="nav">
			<Link to="/">PolyBook</Link>
			<ul>
				<li>
					<Link to="/admin">DashBoard</Link>
					<ion-icon name="cog-outline" />
				</li>
			</ul>
			<ul lass="accordion accordion-flush" id="accordionFlushExample">
				<li className="accordionItem">
					<Link to="/admin/book" className="accordion-header" type="button">
						Sách
					</Link>
				</li>
			</ul>
			<ul lass="accordion accordion-flush" id="accordionCate">
				<li className="accordionItem">
					<Link to="/admin/category" className="accordion-header" type="button">
						Danh mục
					</Link>
				</li>
			</ul>
			<ul lass="accordion accordion-flush" id="accordionReview">
				<li className="accordionItem">
					<Link to="/admin/review" className="accordion-header" type="button">
						Review
					</Link>
				</li>
			</ul>
			<ul lass="accordion accordion-flush" id="accordionFlushMember">
				<li className="accordionItem">
					<a
						className="accordion-header"
						id="flush-headingMember"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#flush-collapseMember"
						aria-expanded="false"
						aria-controls="flush-collapseMember"
					>
						Thành viên
					</a>
					<ion-icon name="cart-outline" />
				</li>
			</ul>
		</div>
	);
};

export default Nav;
