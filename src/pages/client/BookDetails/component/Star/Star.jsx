import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';

const Star = ({ rating, className }) => {
	const totalStars = 5;

	return (
		<div className={className}>
			{[...Array(totalStars)].map((_, index) => (
				<FaStar
					key={index}
					className={index < rating ? 'star active me-2' : 'star me-2'}
					color={index < rating ? '#ffc107' : '#e4e5e9'}
					size={16}
				/>
			))}
		</div>
	);
};

export default Star;
