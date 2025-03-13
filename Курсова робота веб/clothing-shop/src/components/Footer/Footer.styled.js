import styled from 'styled-components';

export const FooterContainer = styled.footer`
  background-color: #000;
  color: #fff;
  padding: 2rem;
  text-align: center;
`;

export const FooterTop = styled.div`
  h1 {
    margin-bottom: 1rem;
  }
  
  p {
    margin-bottom: 1.5rem;
  }
`;

export const InputContainer = styled.div`
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const EmailInput = styled.input`
  border-radius: 8px 0 0 8px;
  margin-top: 10px;
  padding: 0.5rem 1rem;
  border: 1px solid rgba(255, 255, 255, 0.3);
  width: 300px;
  height: 40px;
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  transition: border 0.3s, box-shadow 0.3s;
  box-sizing: border-box;

  &:focus {
    border: 1px solid rgba(255, 255, 255, 0.7);
    box-shadow: 0 0 15px rgba(255, 255, 255, 0.8);
    outline: none;
  }
`;

export const SendButton = styled.button`
  border-radius: 0 8px 8px 0;
  padding: 0.5rem 1rem;
  height: 40px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  background-color: rgba(255, 255, 255, 0.1);
  color: #f4f4f5;
  cursor: pointer;
  transition: background-color 0.3s, box-shadow 0.3s;
  backdrop-filter: blur(10px);
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
    border: 1px solid rgb(255, 255, 255);
  }
`;

export const FooterLinks = styled.div`
  display: flex;
  justify-content: center;
  margin: 1rem 0;

  > div {
    flex: 1;
    text-align: left;
    padding: 0 1rem;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;
  }

  h3 {
    margin-bottom: 0.5rem;
    color: #9e0404;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    transition: color 0.3s;
    color: #fff;

    &:hover {
      color: #9e0404;
    }
  }
`;

export const FooterBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
`;

export const SocialIcons = styled.div`
  margin: 0;
`;

export const SocialIcon = styled.a`
  margin: 0 10px;
  color: #fff;
  font-size: 24px;
  transition: transform 0.3s, color 0.3s;

  &:hover {
    transform: scale(1.2);
    color: #9e0404;
  }
`; 