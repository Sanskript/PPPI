import Marquee from '../Marquee/Marquee';
import ImageSlider from '../ImageSlider/ImageSlider';
import Jumbotron from '../Jumbotron/Jumbotron';
import Countdown from '../Countdown/Countdown';
import NumberCounter from '../NumberCounter/NumberCounter';
import Guides from '../Guides/Guides';
import TechwearCarousel from '../TechwearCarousel/TechwearCarousel';
import InfoStrip from '../InfoStrip/InfoStrip';

function Home() {
    return (
        <div>
            <Marquee />
            <ImageSlider />
            <Jumbotron>
                <Countdown />
            </Jumbotron>
            <NumberCounter />
            <Guides />
            <TechwearCarousel />
            <InfoStrip />
        </div>
    );
}

export default Home;
