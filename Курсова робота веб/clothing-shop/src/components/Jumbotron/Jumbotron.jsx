import PropTypes from 'prop-types';
import {
    JumbotronContainer,
    Title,
    Description,
    ButtonContainer,
    StyledButton
} from './Jumbotron.styled';

const Jumbotron = ({ title, children }) => {
    return (
        <JumbotronContainer>
            <Title>
                {title}
            </Title>
            <Description>
                {children}
            </Description>
            <ButtonContainer>
                <StyledButton 
                    className="primary"
                    size="large"
                >
                    Getting Start
                </StyledButton>
                <StyledButton 
                    className="secondary"
                    size="large"
                >
                    Learn More
                </StyledButton>
            </ButtonContainer>
        </JumbotronContainer>
    );
};

Jumbotron.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
};

export default Jumbotron; 