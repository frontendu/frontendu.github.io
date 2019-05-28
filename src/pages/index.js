import React from 'react';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import {
	graphql,
	Link,
	StaticQuery
} from 'gatsby';

import { Timeline } from 'react-twitter-widgets';
import SocialLinks from '../components/patrials/social-links';
import { postponeLoadFont } from '../lib/font-loading';

import '../index.css';

import logo from '../assets/logo.svg';
import coin from '../assets/coin.svg';

const LogoWrapper = styled.div`
	position: relative;
	margin: 0 auto;
	width: 320px;
	min-height: 320px;

	@media (min-width: 768px) {
		width: 360px;
		min-height: 360px;
	}
`;

const Logo = styled.img`
	width: 100%;
	box-sizing: border-box;
	padding: 20px;
`;

const Content = styled.div`
	width: 100%;
	min-height: 101%;
`;

const Hero = styled.div`
	text-align: center;
`;

const TeamName = styled.div`
	font-size: 24px;
	font-weight: 600;
	line-height: 1.5;
	background-color: #000;
	color: #fff;
	padding: 10px 20px 10px 20px;
	width: 80%;
	display: inline-block;
	margin: 0 auto 40px;

	@media (min-width: 375px) {
		font-size: 32px;
	}

	@media (min-width: 768px) {
		width: auto;
		font-size: 42px;
	}
`;

const StyledSocialLinks = styled(SocialLinks)`
	margin: 0 40px 40px;
`;

const Greating = styled.div`
	font-weight: 100;
	font-size: 24px;
	max-width: 420px;
	line-height: 1.5;
	margin: 0 auto;
	margin-bottom: 20px;

	@media (min-width: 768px) {
		font-size: 36px;
	}
`;

const HighlightText = styled.span`
	background-color: #ff0000;
	color: #ffffff;
	padding: 5px;
`;

const StyledLogoLink = styled(Link)`
	display: block;
`;

const StyledDonateLink = styled(Link)`
	position: absolute;
	display: inline-block;
	top: 20px;
	right: 20px;

	@media (min-width: 768px) {
		top: 40px;
		right: 40px;
		width: 60px;
		height: 80px;
	}
`;

const Coin = styled.div`
	width: 30px;
	height: 40px;
	background-image: url(${coin});
	background-size: contain;
	background-repeat: no-repeat;

	@media (min-width: 768px) {
		width: 60px;
		height: 80px;
	}
`;

const StyledTimeline = styled.div`
	max-width: 900px;
	margin: 0 auto;
`;

class Landing extends React.Component {
	componentDidMount() {
		postponeLoadFont();
	}

	render() {
		return (
			<StaticQuery
				query={graphql`
					query LandingTitleQuery {
						site {
							siteMetadata {
								title
							}
						}
					}
				`}
				render={(data) =>
					<Content>
						<Helmet>
							<title>{data.site.siteMetadata.title}</title>
							<meta name="description" content="Подкаст о фронтенде" />
							<meta name="keywords" content="Фронтенд, подкаст, React, JavaScript, CSS" />
							<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
							<link href="http://feeds.soundcloud.com/users/soundcloud:users:306631331/sounds.rss?token=e0ce75-1-1557845325422" rel="alternate" title="Фронтенд Юность — самый честный подкаст о фронтенде" type="application/rss+xml" />
							<meta name="theme-color" content="#ff6666" />
							<meta name="yandex-verification" content="91a89c4989f35709" />
							<link rel="icon" type="image/png" sizes="32x32" href="/favicon.png" />
							<link rel="shortcut icon" href="/favicon.ico" />
						</Helmet>
						<Hero>
							<LogoWrapper>
								<StyledLogoLink to="/">
									<Logo src={logo} />
								</StyledLogoLink>
							</LogoWrapper>
							<TeamName>Фронтенд Юность</TeamName>
							<StyledSocialLinks />
							<Greating>
								Самый <HighlightText>честный</HighlightText> подкаст&nbsp;о&nbsp;фронтенде!
							</Greating>
						</Hero>
						<StyledDonateLink tabIndex="1" to="/donate">
							<Coin />
						</StyledDonateLink>
						<StyledTimeline>
							<Timeline
								dataSource={{
									sourceType: 'profile',
									screenName: 'frontend_u'
								}}
								options={{
									username: 'frontend_u'
								}}
							/>
						</StyledTimeline>
					</Content>
				}
			/>
		);
	}
}

export default Landing;
