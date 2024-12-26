import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import './StarRating.css';

const StarRating = ({ onRatingChange }) => {
	const [rating, setRating] = useState(1);
	const [hover, setHover] = useState(0);

	const handleMouseOver = (index) => {
		setHover(index);
	};

	const handleMouseLeave = () => {
		setHover(0);
	};

	const handleClick = (index) => {
		setRating(index);
		onRatingChange(index);
	};

	return (
		<div className="">
			{[1, 2, 3, 4, 5].map((index) => (
				<FaStar
					key={index}
					className={index <= (hover || rating) ? 'star active' : 'star'}
					color={(hover || rating) >= index ? '#ffc107' : '#e4e5e9'}
					size={20}
					onMouseOver={() => handleMouseOver(index)}
					onMouseLeave={handleMouseLeave}
					onClick={() => handleClick(index)}
				/>
			))}
		</div>
	);
};

export default StarRating;
