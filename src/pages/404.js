import React from 'react'
import styled from 'styled-components';
import BaseLayout from '../components/base';

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
	padding: 5px;
	font-size: 54px;
	background-color: #000000;
	color: #ffffff;
`;

const DescriptionText = styled.p`
	font-weight: 100;
	font-size: 32px;
`;

const NotFoundPage = () => (
	<BaseLayout>
		<Content>
			<HighlightText>Йо, йо, йо,</HighlightText>
			<DescriptionText>Это самая не найденная страница на свете!</DescriptionText>
		</Content>
	</BaseLayout>
)

export default NotFoundPage
