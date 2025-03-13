import { useEffect, useState } from 'react';
import { Box, IconButton } from '@mui/material';
import { ArrowForward, ArrowBack } from '@mui/icons-material';
import image1 from './images/image1.webp';
import image2 from './images/image2.webp';

const images = [image1, image2];


const ImageSlider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    useEffect(() => {
        const interval = setInterval(nextSlide, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <Box sx={{
            position: 'relative',
            height: '800px',
            backgroundImage: `url(${images[currentIndex]})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        }}>
            <IconButton onClick={prevSlide} sx={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }}>
                <ArrowBack sx={{ color: '#fff' }} />
            </IconButton>
            <IconButton onClick={nextSlide} sx={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)' }}>
                <ArrowForward sx={{ color: '#fff' }} />
            </IconButton>
        </Box>
    );
};

export default ImageSlider; 