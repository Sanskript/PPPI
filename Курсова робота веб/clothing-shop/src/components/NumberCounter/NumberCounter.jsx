import { useEffect, useState } from 'react';
import styles from './NumberCounter.module.css';

const NumberCounter = () => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let isMounted = true;
        const interval = setInterval(() => {
            setCount((prevCount) => {
                if (prevCount < 10500) {
                    return prevCount + 25;
                } else {
                    clearInterval(interval);
                    return prevCount;
                }
            });
        }, 0.1);

        return () => {
            isMounted = false;
            clearInterval(interval);
        };
    }, []);

    return (
        <div className={styles.numberCounter}>
            <h1 className={styles.gradientText}>+{count}</h1>
            <h3 className='geard'>Crossover geared up with our techwear</h3>
            <p style={{ marginTop: '2rem' }}>4.7/5★</p>
        </div>
    );
};

export default NumberCounter;