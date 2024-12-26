import React from 'react';
import Layout from '../Layout/Layout';
import './Dashboad.css';
import { Outlet } from 'react-router-dom';

const Dashboad = () => {
	return (
		<Layout>
			<div className="container">
				<div className="cards row mt-5">
					<div className="card-single col-lg-3 ">
						<div className="bg-success py-5 ml-3 d-flex justify-content-around  text-white ">
							<div className="flex-colum">
								<h1 className="font-weight-bold">1</h1>
								<span>Danh mục</span>
							</div>
							<div>
								<i
									className="fas fa-th-list"
									style={{ fontSize: 80 }}
									aria-hidden="true"
								/>
							</div>
						</div>
					</div>
					<div className="card-single col-lg-3 ">
						<div className="d-flex justify-content-around bg-warning  text-white py-5 ml-3">
							<div className="flex-colum">
								<h1 className="font-weight-bold">1</h1>
								<span>Sản phẩm</span>
							</div>
							<div>
								<i
									className="fas fa-sitemap"
									style={{ fontSize: 80 }}
									aria-hidden="true"
								/>
							</div>
						</div>
					</div>
					<div className="card-single col-lg-3 ">
						<div className="d-flex justify-content-around bg-danger text-white py-5 ml-3">
							<div className="flex-colum">
								<h1 className="font-weight-bold">1</h1>
								<span>Khách hàng</span>
							</div>
							<div>
								<i
									className="fas fa-users"
									style={{ fontSize: 80 }}
									aria-hidden="true"
								/>
							</div>
						</div>
					</div>
					<div className="card-single col-lg-3 ">
						<div className="d-flex justify-content-around bg-primary  text-white py-5 ml-3">
							<div className="flex-colum">
								<h1 className="font-weight-bold">1</h1>
								<span>Đơn hàng</span>
							</div>
							<div>
								<i
									className="fas fa-comments"
									style={{ fontSize: 80 }}
									aria-hidden="true"
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
			<Outlet />
		</Layout>
	);
};

export default Dashboad;
