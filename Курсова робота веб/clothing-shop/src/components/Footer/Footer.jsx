import { FaFacebook, FaInstagram, FaPinterest, FaTelegram, FaTiktok } from 'react-icons/fa';
import { footerLinks } from '../../constants/footerData';
import {
    FooterContainer,
    FooterTop,
    InputContainer,
    EmailInput,
    SendButton,
    FooterLinks,
    FooterBottom,
    SocialIcons,
    SocialIcon
} from './Footer.styled';

function Footer() {
	return (
		<FooterContainer>
			<FooterTop>
				<h1>JOIN THE CROSSOVER</h1>
				<p>Be the first to hear about new drops, exclusive sales and more.</p>
				<div className="flex h-[34px] text-[14px] text-white/60">
					<InputContainer>
						<EmailInput
							name="text"
							type="text"
							placeholder="Email"
						/>
						<SendButton>
							Send
						</SendButton>
					</InputContainer>
				</div>
			</FooterTop>
			
			<FooterLinks>
				<div>
					<h3>About us</h3>
					<p>Crossover is the techwear official store for cutting-edge, 
						functional fashion that seamlessly blends urban style with 
						high-performance materials.</p>
				</div>
				<div>
					<h3>Help</h3>
					<ul>
						{footerLinks.help.map((help, index) => (
							<li key={index}>{help}</li>
						))}
					</ul>
				</div>
				<div>
					<h3>Information</h3>
					<ul>
						{footerLinks.information.map((information, index) => (
							<li key={index}>{information}</li>
						))}
					</ul>
				</div>
				<div>
					<h3>Resource</h3>
					<ul>
						{footerLinks.resource.map((resource, index) => (
							<li key={index}>{resource}</li>
						))}
					</ul>
				</div>
			</FooterLinks>
			
			<FooterBottom>
				<p>© 2024|All Rights Reserved</p>
				<SocialIcons>
					<SocialIcon href="#">
						<FaFacebook />
					</SocialIcon>
					<SocialIcon href="#">
						<FaInstagram />
					</SocialIcon>
					<SocialIcon href="#">
						<FaTelegram />
					</SocialIcon>
					<SocialIcon href="#">
						<FaTiktok />
					</SocialIcon>
					<SocialIcon href="#">
						<FaPinterest />
					</SocialIcon>
				</SocialIcons>
			</FooterBottom>
		</FooterContainer>
	);
}

export default Footer;
