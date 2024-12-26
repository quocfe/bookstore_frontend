import React, { useState, useEffect } from 'react';
import './GoToTopButton.css';

const GoToTopButton = () => {
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			const scrollY = window.scrollY;
			setIsVisible(scrollY > 200);
		};

		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	};

	return (
		<div
			className={`go-to-top-button ${isVisible ? 'visible' : ''}`}
			onClick={scrollToTop}
		>
			<span>&uarr;</span>
		</div>
	);
};

export default GoToTopButton;
