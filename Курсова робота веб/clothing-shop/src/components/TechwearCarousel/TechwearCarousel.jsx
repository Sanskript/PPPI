import { useState } from 'react';
import { Stepper, Step, StepLabel } from '@mui/material';
import './TechwearCarousel.css';
import casualImage from './images/casual.webp';
import cyberpunk from './images/cyberpunk.jpg';
import punk from './images/punk.avif';
import warcore from './images/warcore.webp';
import goth from './images/goth.webp';

const steps = [
	{
		title: "CASUAL CROSSOVER",
		text: (
			<>
				Casual crossover is a more relaxed and approachable version of traditional crossover, combining everyday comfort with functional, high-performance elements.
				<br /><br />
				This style focuses on integrating crossover&apos;s practicality, such as water-resistant fabrics, breathability, and ergonomic designs, into clothing that is easy to wear daily.
				<br /><br />
				Unlike the avant-garde looks often associated with crossover, casual crossover emphasizes a streamlined, minimalist aesthetic, typically in neutral colors like black, gray, and navy.
				<br /><br />
				Whether you&apos;re a crossover enthusiast or just looking for a stylish and practical wardrobe, casual crossover is definitely worth exploring. Its unique blend of comfort, functionality, and style makes it a great addition to any wardrobe.
				<br /><br />
				Casual crossover is perfect for those who want to look stylish without sacrificing comfort.
			</>
		),
		image: casualImage
	},
	{
		title: "CYBERPUNK CROSSOVER",
		text: (
			<>
				Cyberpunk techwear is a fashion style that combines dystopian, high-tech aesthetics of cyberpunk with the practical functionality of techwear.
				<br /><br />
				This style focuses on integrating the practicality of techwear, such as water-repellent fabrics, breathability, and ergonomic designs, into clothing that is easy to wear daily.
				<br /><br />
				Unlike the avant-garde looks often associated with cyberpunk, cyberpunk techwear emphasizes a streamlined, minimalist aesthetic, typically in neutral colors like black, gray, and dark blue.
				<br /><br />
				Whether you&apos;re a cyberpunk enthusiast or just looking for a stylish and practical wardrobe, cyberpunk techwear is definitely worth exploring. Its unique blend of comfort, functionality, and style makes it a great addition to any wardrobe.
				<br /><br />
				Cyberpunk techwear is ideal for those who want to express their individuality through fashion.
			</>
		),
		image: cyberpunk
	},
	{
		title: "PUNK CROSSOVER",
		text: (
			<>
				Punk techwear is a fashion style that combines rebellious, anti-establishment aesthetics of punk with the practical functionality of techwear.
				<br /><br />
				This style focuses on integrating the practicality of techwear, such as water-repellent fabrics, breathability, and ergonomic designs, into clothing that is easy to wear daily.
				<br /><br />
				Unlike the avant-garde looks often associated with punk, punk techwear emphasizes a rugged, edgy aesthetic, typically in dark colors like black, gray, and dark blue.
				<br /><br />
				Whether you&apos;re a punk enthusiast or just looking for a stylish and practical wardrobe, punk techwear is definitely worth exploring. Its unique blend of comfort, functionality, and style makes it a great addition to any wardrobe.
				<br /><br />
				Punk techwear is great for those who want to make a statement with their fashion choices.
			</>
		),
		image: punk
	},
	{
		title: "WARCORE CROSSOVER",
		text: (
			<>
				Warcore techwear is a fashion style that combines the aggressive, militaristic aesthetics of warcore with the practical functionality of techwear.
				<br /><br />
				This style focuses on integrating the practicality of techwear, such as water-repellent fabrics, breathability, and ergonomic designs, into clothing that is easy to wear daily.
				<br /><br />
				Unlike the avant-garde looks often associated with warcore, warcore techwear emphasizes a rugged, utilitarian aesthetic, typically in dark colors like black, gray, and olive green.
				<br /><br />
				Whether you&apos;re a warcore enthusiast or just looking for a stylish and practical wardrobe, warcore techwear is definitely worth exploring. Its unique blend of comfort, functionality, and style makes it a great addition to any wardrobe.
				<br /><br />
				Warcore techwear is perfect for those who want a wardrobe that exudes strength and resilience.
			</>
		),
		image: warcore
	},
	{
		title: "GOTH CROSSOVER",
		text: (
			<>
				Goth techwear is a fashion style that combines the dark, mysterious aesthetics of goth with the practical functionality of techwear.
				<br /><br />
				This style focuses on integrating the practicality of techwear, such as water-repellent fabrics, breathability, and ergonomic designs, into clothing that is easy to wear daily.
				<br /><br />
				Unlike the avant-garde looks often associated with goth, goth techwear emphasizes a dark, romantic aesthetic, typically in dark colors like black, purple, and red.
				<br /><br />
				Whether you&apos;re a goth enthusiast or just looking for a stylish and practical wardrobe, goth techwear is definitely worth exploring. Its unique blend of comfort, functionality, and style makes it a great addition to any wardrobe.
				<br /><br />
				Goth techwear is ideal for those who want to express their individuality through dark, mysterious fashion.
			</>
		),
		image: goth
	}
];

const TechwearCarousel = () => {
	const [activeStep, setActiveStep] = useState(0);

	const handleNext = () => {
		setActiveStep((prevActiveStep) => (prevActiveStep + 1) % steps.length);
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => (prevActiveStep - 1 + steps.length) % steps.length);
	};

	return (
		<div>
			<div className="stepper">
				<Stepper activeStep={activeStep} alternativeLabel>
					{steps.map((step, index) => (
						<Step key={index}>
							<StepLabel><p className='title'>{step.title}</p></StepLabel>
						</Step>
					))}
				</Stepper>
			</div>
			<div className="techwear-block">
				<img src={steps[activeStep].image} alt={steps[activeStep].title} className="techwear-image" />
				<div className="techwear-content">
					<h2 className="techwear-title">{steps[activeStep].title}</h2>
					<p className="techwear-text">{steps[activeStep].text}</p>
				</div>
			</div>
			<div className="step-button">
				<button onClick={handleBack} disabled={activeStep === 0}>Back</button>
				<button onClick={handleNext} disabled={activeStep === steps.length - 1}>Next</button>
			</div>
		</div>
	);
};

export default TechwearCarousel;
