import React from 'react';
import styled from 'styled-components';

const StyledShuf = styled.img.attrs({
	src: '/shuf.png'
})`
	z-index: 2;
	width: 200px;
	position: absolute;
	transition: left 1s, right 1s, top 1s, bottom 1s;
`;

const StyledCalendar = styled.div`
	position: absolute;
	font-size: 144px;
	cursor: pointer;
	z-index: 1;
	background-color: rgba(255, 255, 255, 0.7);
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	display: flex;
	text-align: center;
	justify-content: center;
	align-items: center;
`;

const styles = [
	[
		{
			transform: 'rotate(90deg)',
			transformOrigin: 'left bottom'
		},
		'left',
		'-400px',
		() => ({
			top: `${(window.innerHeight / 2) * Math.random()}px`
		})
	],
	[
		{
			transform: 'rotate(270deg)',
			transformOrigin: 'right bottom'
		},
		'right',
		'-400px',
		() => ({
			top: `${(window.innerHeight / 2) * Math.random()}px`
		})
	],
	[
		{
			transform: 'rotate(-180deg)',
			transformOrigin: 'left top'
		},
		'top',
		'-400px',
		() => ({
			left: `${(window.innerWidth / 2) * Math.random()}px`
		}),
		'150px'
	]
];

export function Shuf() {
	const [style, setStyle] = React.useState({
		opacity: 0
	});
	const [rotated, rotate] = React.useReducer((v) => !v, false);
	const [enabled, toggle] = React.useReducer((v) => !v, false);
	const calendarRef = React.useRef();
	const audioRef = React.useRef();

	const animate = React.useCallback(() => {
		const [
			staticStyle,
			dynamicProp,
			dynamicValue,
			dynamicStyle,
			finalProp = '0px'
		] = styles[Math.floor(Math.random() * styles.length)];

		if (!audioRef.current) {
			return;
		}

		audioRef.current.currentTime = audioRef.current.duration * Math.random();

		setStyle({
			...staticStyle,
			...dynamicStyle(),
			opacity: 0,
			[dynamicProp]: dynamicValue
		});

		setTimeout(() => {
			if (!audioRef.current) {
				return;
			}

			audioRef.current.play();

			setStyle((oldStyle) => ({
				...oldStyle,
				opacity: 1,
				[dynamicProp]: finalProp
			}));
			setTimeout(() => {
				if (!audioRef.current) {
					return;
				}

				audioRef.current.pause();
				setStyle((oldStyle) => ({
					...oldStyle,
					[dynamicProp]: dynamicValue
				}));
			}, 2500);
		}, 2500);
	}, []);

	React.useEffect(() => {
		audioRef.current = new Audio('/shuf.mp3');
	}, []);

	React.useEffect(() => {
		if (!enabled) {
			return;
		}

		setInterval(() => {
			animate();
		}, 7000);
	}, [enabled]);

	const onRotate = React.useCallback(() => {
		rotate();
		calendarRef.current.addEventListener('transitionend', () => {
			toggle();
			animate();
		});
	}, []);

	if (!enabled) {
		return (
			<StyledCalendar
				onClick={onRotate}
			>
				<div ref={calendarRef} style={{ transition: 'transform 1s', transform: rotated ? 'rotate(3000deg)' : undefined }}>
					🗓
				</div>
			</StyledCalendar>
		);
	}

	return <StyledShuf style={style} />;
}
