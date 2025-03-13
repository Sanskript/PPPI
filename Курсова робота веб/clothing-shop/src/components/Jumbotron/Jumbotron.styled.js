import styled from 'styled-components';
import { Button as MuiButton } from '@mui/material';

export const JumbotronContainer = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  background-color: #000;
  color: #fff;
`;

export const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  font-weight: bold;
  letter-spacing: 2px;
`;

export const Description = styled.div`
  font-size: 1.25rem;
  margin-bottom: 2rem;
  color: rgba(255, 255, 255, 0.8);
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  align-items: center;
	
`;

export const StyledButton = styled(MuiButton)`
  && {
    padding: 12px 24px;
    font-size: 1rem;
    font-weight: 500;
    text-transform: uppercase;
    transition: all 0.3s ease;

    &.primary {
      background-color: #9e0404;
      color: #fff;
      border: 2px solid #9e0404;

      &:hover {
        background-color: #7a0303;
        border-color: #7a0303;
      }
    }

    &.secondary {
      background-color: transparent;
      color: #9e0404;
      border: 2px solid #9e0404;

      &:hover {
        background-color: rgba(158, 4, 4, 0.1);
      }
    }
  }
`; 