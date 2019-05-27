import React from 'react';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import {
	graphql,
	Link,
	StaticQuery
} from 'gatsby';

import SocialLinks from './patrials/social-links';
import { postponeLoadFont } from '../lib/font-loading';

import '../index.css';

import logo from '../assets/logo.svg';

const Content = styled.div`
	width: 100%;
	height: 100%;
`;

const Header = styled.header`
	max-width: 1280px;
	margin: 0 auto;
	text-align: left;
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	align-items: center;
	box-sizing: border-box;
	padding: 0 80px;
	flex-direction: column;

	@media (min-width: 1280px) {
		padding: 40px;
		justify-content: space-between;
		flex-direction: row;
	}
`;

const Logo = styled.img`
	width: 160px;
	min-height: 160px;
	box-sizing: border-box;
	padding: 20px;
`;

const StyledLink = styled(Link)`
	display: block;
`;

const StyledNavLink = styled(Link)`
	display: inline-block;
	padding: 20px;
	font-size: 24px;
	color: black;
`;

const StyledSocialLinks = styled(SocialLinks)`
	@media (min-width: 768px) {
		justify-content: flex-end;
	}
`;

class BaseLayout extends React.Component {
	componentDidMount() {
		postponeLoadFont();
	}

	render() {
		return (
			<StaticQuery
				query={graphql`
					query SiteTitleQuery {
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
							<meta name="viewport" content="width=device-width, initial-scale=1" />
							<meta name="theme-color" content="#ff6666" />
							<link rel="icon" type="image/png" sizes="32x32" href="/favicon.png" />
							<link rel="shortcut icon" href="/favicon.ico" />
						</Helmet>
						<Header>
							<StyledLink to="/">
								<Logo src={logo} />
							</StyledLink>
							<StyledNavLink to="/">
								На главную
							</StyledNavLink>
							<StyledSocialLinks />
						</Header>
						{this.props.children}
					</Content>
				}
			/>
		);
	}
}

export default BaseLayout;
