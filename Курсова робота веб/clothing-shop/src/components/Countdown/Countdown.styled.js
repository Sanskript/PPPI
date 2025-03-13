import styled, { keyframes } from 'styled-components';

const pulseAnimation = keyframes`
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.02);
    opacity: 0.9;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

export const CountdownContainer = styled.div`
  background-color: #000;
  color: white;
  // padding: 20px 0;
  text-align: center;
  font-family: 'Arial', sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
	margin-top: 0px;
	margin-bottom: 50px;
`;

export const Title = styled.h1`
  font-size: 2.5rem;
  margin: 0;
  font-weight: 700;
  letter-spacing: 4px;
  animation: ${pulseAnimation} 3s infinite ease-in-out;
  color: white;
  text-shadow: 0 0 10px rgba(255, 0, 0, 0.3);
`;

export const TimeContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 25px;
  margin: 15px 0;
  font-family: 'Courier New', monospace;
  max-width: 600px;
  width: 100%;
  padding: 0 20px;
`;

export const TimeUnit = styled.span`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
   background: #2e2c2c94;
  padding: 15px;
  border-radius: 8px;
  font-weight: bold;
  min-width: 100px;
  border: 1px solid white;
  box-shadow: 0 0 15px rgba(158, 4, 4, 0.1);
  font-size: 2rem;
  color: white;
  position: relative;
  transition: all 0.3s ease;
	

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 0 20px rgba(158, 4, 4, 0.2);
  }

  &::after {
    content: attr(data-label);
    display: block;
    font-size: 0.8rem;
    color: white;
    margin-top: 5px;
    font-weight: 500;
    letter-spacing: 1px;
    text-transform: uppercase;
  }
`;

export const PromoCode = styled.p`
  margin: 10px 0 0;
  font-weight: bold;
  color: white;
  letter-spacing: 2px;
  font-size: 1.2rem;
  padding: 10px 20px;
  background: rgba(158, 4, 4, 0.1);
  border-radius: 4px;
  display: inline-block;
  border: 1px solid rgba(158, 4, 4, 0.2);
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.1);
	margin-bottom: 50px;

  &:hover {
    background: rgba(158, 4, 4, 0.15);
    cursor: pointer;
  }
`; 