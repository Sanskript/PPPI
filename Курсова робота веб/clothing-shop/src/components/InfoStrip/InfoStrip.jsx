import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShippingFast, faLock, faUndo, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import './InfoStrip.css';
import { useState, useEffect } from 'react';

const InfoStrip = () => {
	const [activeIndex, setActiveIndex] = useState(0);
	const [isMobileOrTablet, setIsMobileOrTablet] = useState(window.innerWidth <= 900);

	useEffect(() => {
		const handleResize = () => {
			setIsMobileOrTablet(window.innerWidth <= 900);
		};

		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	const items = [
		{
			icon: faShippingFast,
			title: "FREE SHIPPING",
			description: "No minimum purchase. Stylish techwear delivered right to your door."
		},
		{
			icon: faLock,
			title: "SECURE PAYMENT",
			description: "Shop with confidence! Our secure payment gateway ensures your information stays protected."
		},
		{
			icon: faUndo,
			title: "SATISFIED OR MONEY-BACK",
			description: "Not 100% satisfied? No worries! You have 14 days to return or exchange your items."
		},
		{
			icon: faQuestionCircle,
			title: "NEED HELP?",
			description: "Here to help, 7/7: info@crossover.com"
		}
	];

	// const nextItem = () => {
	// 	setActiveIndex((prevIndex) => (prevIndex + 1) % items.length);
	// };

	return (
		<div className="info-strip">
			{isMobileOrTablet ? (
				<div className="info-item active">
					<FontAwesomeIcon icon={items[activeIndex].icon} size="2x" />
					<h4>{items[activeIndex].title}</h4>
					<p>{items[activeIndex].description}</p>
				</div>
			) : (
				<div className="info-strip-row">
					{items.map((item, index) => (
						<div key={index} className={`info-item ${index === activeIndex ? 'active' : ''}`}>
							<FontAwesomeIcon icon={item.icon} size="2x" />
							<h4>{item.title}</h4>
							<p>{item.description}</p>
						</div>
					))}
				</div>
			)}
			{isMobileOrTablet && (
				<div className="navigation-dots">
					{items.map((_, index) => (
						<span
							key={index}
							className={`dot ${index === activeIndex ? 'active' : ''}`}
							onClick={() => setActiveIndex(index)}
						/>
					))}
				</div>
			)}
		</div>
	);
};

export default InfoStrip;
