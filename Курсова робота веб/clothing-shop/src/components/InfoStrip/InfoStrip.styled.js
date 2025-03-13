import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const StripContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #333;
  color: white;
  text-align: center;
  padding: 40px 20px;
  min-height: 250px;

  @media (max-width: 900px) {
    flex-direction: column;
    align-items: center;
    overflow: hidden;
    position: relative;
    padding: 30px 20px 50px;
  }
`;

export const StripRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  gap: 20px;

  @media (max-width: 900px) {
    flex-direction: column;
    align-items: center;
    padding: 0 20px;
  }
`;

export const InfoItem = styled.div`
  flex: 1;
  width: 270px;
  min-height: 160px;
  padding: 20px 15px;
  text-align: center;
  display: ${props => props.isMobile ? (props.isActive ? 'block' : 'none') : 'block'};
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }

  @media (max-width: 900px) {
    width: 100%;
    max-width: 270px;
    margin: 0;
    display: ${props => props.isActive ? 'block' : 'none'};
    padding: 10px 15px;
  }
`;

export const StyledIcon = styled(FontAwesomeIcon)`
  color: white;
  font-size: 2rem;
  margin-bottom: 15px;
  transition: transform 0.3s ease;

  ${InfoItem}:hover & {
    transform: scale(1.1);
  }
`;

export const Title = styled.h4`
  font-weight: bold;
  margin: 0 0 12px 0;
  color: white;
  font-size: 1.1rem;
  letter-spacing: 1px;
  text-transform: uppercase;
`;

export const Description = styled.p`
  margin: 0;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.4;
  width: 240px;
  margin: 0 auto;
`;

export const NavigationDots = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 30px;
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);

  @media (min-width: 901px) {
    display: none;
  }
`;

export const Dot = styled.span`
  height: 8px;
  width: 8px;
  background-color: ${props => props.active ? 'white' : 'rgba(255, 255, 255, 0.3)'};
  border-radius: 50%;
  display: inline-block;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${props => props.active ? 'white' : 'rgba(255, 255, 255, 0.5)'};
  }
`; 