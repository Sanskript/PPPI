import { useEffect, useState } from 'react';
import './Marquee.css';

const Marquee = () => {
    const [message] = useState('15% OFF | CODE: XMAS24');
    const [spans, setSpans] = useState([]);

    useEffect(() => {
        const generateSpans = () => {
            const newSpans = Array.from({ length: 1000 }, (_, index) => (
                <span key={index}>{message}</span>
            ));
            setSpans(newSpans);
        };

        generateSpans();
    }, [message]);

    return (
        <div className="marquee">
            <div className="marquee-content">
                {spans}
            </div>
        </div>
    );
};

export default Marquee; 