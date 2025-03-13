import styled from 'styled-components';
import warcoreImage from './images/WARCORE.jfif';
import dystopianFashionImage from './images/DYSTOPIAN_FASHION.webp';
import gorpcoreImage from './images/what-is-gorpcore.webp';
import { Fab } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const GuidesContainer = styled.div`
  padding: 2rem;
  background-color: #000000;
  color: #ffffff;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 1.5rem;
  font-size: 2.5rem;
  font-weight: bold;
`;

const CardContainer = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
`;

const Card = styled.div`
  background-color: #1a1a1a;
  color: #ffffff;
  padding: 1.5rem;
  margin: 2rem;
  border-radius: 8px;
  width: 30%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  text-align: center;
`;

const CardImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px 8px 0 0;
`;

const CardTitle = styled.h3`
  font-size: 1.5rem;
  margin: 1rem 0;
  font-weight: bold;
`;

const CardText = styled.p`
  font-size: 1rem;
  line-height: 1.5;
  color: #cccccc;
`;

const CenterButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1rem auto;
		margin-bottom: 100px;

`;

const StyledFab = styled(Fab)`
  margin-top: 1rem;
`;

const Guides = () => {
  return (
    <GuidesContainer>
      <Title>Techwear Guide</Title>
      <CardContainer>
        <Card>
          <CardImage src={dystopianFashionImage} alt="Dystopian Fashion" />
          <CardTitle>What is Dystopian Fashion?</CardTitle>
          <CardText>
            Explore how dystopian fashion merges functionality with futuristic aesthetics, reflecting survival and resistance in a changing world.
          </CardText>
        </Card>
        <Card>
          <CardImage src={warcoreImage} alt="Warcore" />
          <CardTitle>Warcore</CardTitle>
          <CardText>
            Discover the bold Warcore style—where military aesthetics meet urban fashion for a rugged, street-ready look.
          </CardText>
        </Card>
        <Card>
          <CardImage src={gorpcoreImage} alt="Gorpcore" />
          <CardTitle>What is Gorpcore?</CardTitle>
          <CardText>
            Gorpcore is a style that embraces outdoor and utilitarian aesthetics, blending functionality with fashion.
          </CardText>
        </Card>
      </CardContainer>
      <CenterButton>
        <StyledFab variant="extended">
          View all <ArrowForwardIcon />
        </StyledFab>
      </CenterButton>
    </GuidesContainer>
  );
};

export default Guides;