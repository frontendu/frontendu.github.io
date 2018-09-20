import React from 'react'
import styled from 'styled-components';

import {executeCommand} from '../services/metrika';

// ## Emoji
import smile from '../assets/emoji/smile.svg';
import wink from '../assets/emoji/wink.svg';
import fun from '../assets/emoji/fun.svg';
import thumb from '../assets/emoji/thumb.svg';
import arm from '../assets/emoji/arm.svg';

import card from '../assets/card.png';
import yamoney from '../assets/yamoney.png';

const Content = styled.div`
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

const Motivation = styled.p`
	font-weight: 100;
	line-height: 1.5;
	font-size: 20px;
	text-align: center;

	@media (min-width: 768px) {
		text-align: justify;
		font-size: 42px;
	}
`;

const HighlightText = styled.span`
	background-color: #000000;
	color: #ffffff;
	padding: 5px;
`;

const Emoji = styled.div`
	width: 40px;
	height: 40px;
	display: inline-block;
	vertical-align: bottom;
	margin-right: 10px;
	background-image: url(${({src}) => src});
	background-position: center;
	background-repeat: no-repeat;
`;

const getMark = ({sum}) => {
	const int = Math.floor(sum / 1000);
	let src = smile;

	if (int >= 2) {
		src = wink;
	}

	if (int >= 4) {
		src = fun;
	}

	if (int >= 6) {
		src = thumb;
	}

	if (int >= 8) {
		src = arm;
	}

	return src;
}

const EmojiSum = ({sum}) => {
	return <Emoji src={getMark({sum})} />;
}

const StyledDonateForm = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
`;

const StyledInput = styled.input`
	font-weight: 100;
	font-size: 32px;
	box-sizing: border-box;
	background-color: transparent;
	border: none;
	text-align: left;
	border-bottom: 1px solid black;
	width: 100%;
	text-align: center;

	@media (min-width: 768px) {
		width: 70%;
		text-align: left;
	}
`;

const StyledTextArea = styled.textarea`
	background-color: transparent;
	font-size: 24px;
	font-weight: 100;
	border: none;
	border-bottom: 1px solid black;
	box-sizing: border-box;
	width: 100%;
	max-width: 100%;

	@media (min-width: 768px) {
		width: 70%;
		max-width: 70%;
	}
`;

const FormRow = styled.div`
	margin-bottom: 40px;
`;

const FormLabel = styled.div`
	font-size: 24px;
	padding: 5px;
	box-sizing: border-box;
	text-align: center;
	width: 100%;
	float: none;

	@media (min-width: 768px) {
		width: 30%;
		float: left;
		text-align: left;
	}
`;

const CenteredFormRow = FormRow.extend`
	display: flex;
	align-items: center;
	flex-direction: column;

	@media (min-width: 768px) {
		flex-direction: row;
	}
`;

const HiddenRadioButton = styled.input
	.attrs({
		type: 'radio'
	})`
		position: absolute;
		left: -99999px;
	`;

const PaymentTypeImage = styled.label`
	transition: 0.5s opacity;
	height: 100px;
	display: inline-block;
	background-size: contain;
	background-repeat: no-repeat;
	background-position: center;
	margin: 5px;
	cursor: pointer;
	opacity: 0.2;

	${HiddenRadioButton}:checked + & {
		opacity: 1;
	}
`;

const CardLabel = PaymentTypeImage.extend`
	background-image: url(${card});
	width: 90px;
`;

const YaMoneyLabel = PaymentTypeImage.extend`
	background-image: url(${yamoney});
	width: 90px;
`;

const StyledSubmit = styled.button`
	padding: 15px 25px;
	background-color: #ff0000;
	border: none;
	font-weight: 600;
	font-size: 32px;
	color: white;
	width: 100%;
	cursor: pointer;

	@media (min-width: 768px) {
		width: auto;
	}
`;

const StyledPaymentTypes = styled.div`
	display: flex;
`;

const Patreon = styled.a`
	display: inline-block;
	width: 100%;
	font-size: 18px;
	font-weight: 100;
	margin-bottom: 40px;
	text-align: center;

	@media (min-width: 768px) {
		font-size: 42px;
		margin-bottom: 80px;
		text-align: left;
		text-decoration: underline dotted;
	}
`;

class Donate extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			paymentType: 'PC',
			sum: 100,
			comment: ''
		}
	}

	onSumChange(e) {
		const sum = +e.target.value;

		if (isNaN(sum) || sum <= 0) {
			return;
		}

		this.setState({sum});
	}

	onCommentChange(e) {
		this.setState({
			comment: e.target.value
		});
	}

	onPaymentTypeChange(paymentType) {
		this.setState({
			paymentType
		});
	}

	render() {
		const {
			onDonate = () => void 0
		} = this.props;

		const {
			paymentType,
			sum,
			comment
		} = this.state;

		return (
			<StyledDonateForm>
				<form method="POST" action="https://money.yandex.ru/quickpay/confirm.xml">
					<FormRow>
						<FormLabel>Сумма:</FormLabel>
						<StyledInput
							name="sum"
							type="number"
							min="100"
							max="15000"
							data-type="number"
							value={sum}
							onChange={(e) => this.onSumChange(e)}
						/>
					</FormRow>
					<FormRow>
						<FormLabel>Комментарий:</FormLabel>
						<StyledTextArea
							rows="4"
							name="comment"
							value={comment}
							onChange={(e) => this.onCommentChange(e)}
						/>
					</FormRow>
					<CenteredFormRow>
						<FormLabel>Способ оплаты:</FormLabel>
						<StyledPaymentTypes>
							<HiddenRadioButton id="AC" name="paymentType" value="AC" />
							<CardLabel htmlFor="AC" onClick={() => this.onPaymentTypeChange('AC')}/>
							<HiddenRadioButton id="PC" name="paymentType" value="PC" />
							<YaMoneyLabel htmlFor="PC" onClick={() => this.onPaymentTypeChange('PC')}/>
						</StyledPaymentTypes>
					</CenteredFormRow>
					<FormRow>
						<FormLabel />
						<StyledSubmit
							onClick={() => onDonate({
								paymentType
							})}
						>
							<EmojiSum sum={sum} />
							Отправить
						</StyledSubmit>
					</FormRow>
					<input type="hidden" name="receiver" value="410015613562013" />
					<input type="hidden" name="quickpay-form" value="shop" />
					<input type="hidden" name="targets" value="Подкасту Фронтенд Юность" />
					<input type="hidden" name="formcomment" value="Подкасту Фронтенд Юность" />
					<input type="hidden" name="short-dest" value="Подкасту Фронтенд Юность" />
					<input type="hidden" name="need-fio" value="false" />
					<input type="hidden" name="need-email" value="false" /> 
					<input type="hidden" name="need-phone" value="false" />
					<input type="hidden" name="need-address" value="false" />
				</form>
			</StyledDonateForm>
		);
	}
}

class DonatePage extends React.Component {
	componentDidMount() {
		executeCommand(
			this.props.data.site.siteMetadata.trackingId,
			'reachGoal',
			'DONATE_PAGE_SHOWN'
		);
	}

	onDonate({
		paymentType
	}) {
		executeCommand(
			this.props.data.site.siteMetadata.trackingId,
			'reachGoal',
			'DONATE_SUBMIT',
			{
				paymentType
			}
		);
	}

	render() {
		return (
			<Content>
				<Motivation>
					Йо, йо, йо! Это <HighlightText>Фронтенд&nbsp;Юность</HighlightText>! Нравится наш проект? Закинь нам баблишка, братишка!
				</Motivation>
				<Patreon
					href="https://www.patreon.com/frontend_u?utm_source=youknow.st&utm_campaign=donate_page"
					target="_blank"
				>
					Подпишись на наш патреон и жди эксклюзивов!
				</Patreon>
				<Donate onDonate={(props) => this.onDonate(props)} />
			</Content>
		);
	}
}

export default DonatePage;

export const query = graphql`
	query DonatePageQuery {
		site {
			siteMetadata {
				trackingId
			}
		}
	}
`;
