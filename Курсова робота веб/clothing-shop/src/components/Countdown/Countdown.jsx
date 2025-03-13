import { useState, useEffect } from 'react';
import {
    CountdownContainer,
    Title,
    TimeContainer,
    TimeUnit,
    PromoCode
} from './Countdown.styled';

const Countdown = () => {
    const calculateTimeLeft = () => {
        const difference = +new Date('2024-12-25') - +new Date();
        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
                seconds: Math.floor((difference % (1000 * 60)) / 1000),
            };
        }
        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);
        return () => clearTimeout(timer);
    }, [timeLeft]);

    const formatNumber = (number) => {
        return number < 10 ? `0${number}` : number;
    };

    return (
        <CountdownContainer>
            <Title>XMAS SALE</Title>
            <TimeContainer>
                {Object.entries(timeLeft).map(([interval, value]) => (
                    <TimeUnit 
                        key={interval}
                        data-label={interval.toUpperCase()}
                    >
                        {formatNumber(value)}
                    </TimeUnit>
                ))}
            </TimeContainer>
            <PromoCode>-15% CODE: XMAS24</PromoCode>
        </CountdownContainer>
    );
};

export default Countdown; 