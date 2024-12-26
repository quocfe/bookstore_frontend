import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import './SeeMore.css';

const SeeMore = ({ text }) => {
	const [showMore, setShowMore] = useState(false);

	const toggleShowMore = () => {
		setShowMore(!showMore);
	};

	const refactorHtml = (text) => {
		if (showMore) {
			return text;
		} else if (text?.length < 200) {
			return text;
		} else {
			return `${text?.slice(0, 500)}...`;
		}
	};

	return (
		<>
			<div
				dangerouslySetInnerHTML={{
					__html: refactorHtml(text),
				}}
			/>
			{text?.length > 200 && (
				<Button
					className="btn-seemore mt-2"
					variant="link"
					onClick={toggleShowMore}
				>
					{showMore ? 'Ẩn bớt' : 'Xem thêm'}
				</Button>
			)}
		</>
	);
};

export default SeeMore;
