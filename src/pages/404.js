import React from 'react'
import styled from 'styled-components';

const Content = styled.div`
	text-align: center;
	box-sizing: border-box;
	margin: 0 auto;
	padding: 40px;
	padding-top: 0;
	margin: 20px auto;
	max-width: 1280px;

	@media (min-width: 768px) {
		padding: 80px;
		padding-top: 0;
	}
`;

const HighlightText = styled.span`
	font-family: 'Fira Sans Bold';
	padding: 5px;
	font-size: 54px;
	background-color: #000000;
	color: #ffffff;
`;

const DescriptionText = styled.p`
	font-family: 'Fira Sans Light';
	font-size: 32px;
`;

const NotFoundPage = () => (
	<Content>
		<HighlightText>Йо, йо, йо,</HighlightText>
		<DescriptionText>Это самая не найденная страница на свете!</DescriptionText>
	</Content>
)

export default NotFoundPage
