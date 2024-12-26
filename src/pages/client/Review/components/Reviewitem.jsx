import React from 'react';
import { Link } from 'react-router-dom';

const ReviewItem = ({
	nameProduct,
	images,
	createAt,
	content,
	view,
	sortDescription,
	type,
	idReview,
}) => {
	const generationDate = (datetimeString) => {
		let time;
		let dateTime = new Date(datetimeString);
		time = `${dateTime.getDate()}-${
			dateTime.getMonth() + 1
		}-${dateTime.getFullYear()}`;
		return time;
	};

	const createMarkup = (text) => {
		return { __html: text };
	};

	return (
		<div className={`col-sm-12 reviewItem ${type}`}>
			<div className="row">
				<div className="col-sm-3">
					<img src={images} alt="" className={type} />
				</div>
				<div className="col-sm-9">
					{type == 'large' ? (
						<div className="content">
							<Link to={`/review/${idReview}`}>
								<div className="title fw-7 fs-18">{nameProduct}</div>
							</Link>
							<div className="row mt-2">
								<div className="col-sm-4 date">
									<p className="mb-0">Ngày đăng: {generationDate(createAt)}</p>
								</div>
								<div className="col-sm-4 view">
									<p className="mb-0">
										Lượt xem: <strong>{view}</strong>
									</p>
								</div>
								<div className="col-sm-4 view">
									<p className="mb-0">
										Người đăng: <strong>Admin</strong>
									</p>
								</div>
							</div>
							<div className="sortDescription">
								<div
									dangerouslySetInnerHTML={createMarkup(sortDescription)}
								></div>
							</div>
						</div>
					) : (
						<div className="content">
							<Link to={`/review/${idReview}`}>
								<div className="title fw-7 fs-18">{nameProduct}</div>
							</Link>
							<div className="sortDescription">
								<div
									dangerouslySetInnerHTML={createMarkup(sortDescription)}
								></div>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default ReviewItem;
