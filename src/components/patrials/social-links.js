import React from 'react';
import styled from 'styled-components';

import email from '../../assets/socials/email.svg';
import telegram from '../../assets/socials/telegram.svg';
import instagram from '../../assets/socials/instagram.svg';
import soundcloud from '../../assets/socials/soundcloud.svg';
import twitter from '../../assets/socials/twitter.svg';
import youtube from '../../assets/socials/youtube.svg';
import medium from '../../assets/socials/medium.svg';
import patreon from '../../assets/socials/patreon.svg';
import vk from '../../assets/socials/vk.svg';
import github from '../../assets/socials/github.svg';

const SocialLinks = styled.div`
	justify-content: center;
	display: flex;
	flex-grow: 1;
	flex-wrap: wrap;

	@media(max-width: 768px) {
		justify-content: center;
	}
`;

const SocialLink = styled.a
	.attrs({
		target: '_blank'
	})`
	filter: grayscale(100%) brightness(0%);
	transition: 0.4s filter;
	border-radius: 10px;
	background-size: cover;
	width: 40px;
	height: 40px;
	margin: 5px;
	display: inline-block;

	&:hover {
		filter: none;
	}

	@media (min-width: 768px) {
		width: 45px;
		height: 45px;
	}
`;

const SoundCloudSocialLink = SocialLink.extend
	.attrs({
		title: 'SoundCloud',
		href: 'https://soundcloud.com/frontend_u'
	})`
	background-image: url(${soundcloud});
`;

const TelegramSocialLink = SocialLink.extend
	.attrs({
		title: 'Telegram-чат',
		href: 'https://t.me/frontend_u'
	})`
	background-image: url(${telegram});
`;

const PatreonSocialLink = SocialLink.extend
	.attrs({
		title: 'Patreon',
		href: 'https://www.patreon.com/frontend_u'
	})`
	background-image: url(${patreon});
`;

const TwitterSocialLink = SocialLink.extend
	.attrs({
		title: 'Twitter',
		href: 'https://twitter.com/frontend_u'
	})`
	background-image: url(${twitter});
`;

const InstagramSocialLink = SocialLink.extend
	.attrs({
		title: 'Instagram',
		href: 'https://www.instagram.com/frontend_u/?hl=ru'
	})`
	background-image: url(${instagram});
`;

const YouTubeSocialLink = SocialLink.extend
	.attrs({
		title: 'YouTube',
		href: 'https://www.youtube.com/channel/UCqq1LRv6KKh0bh4JrG_5vDA'
	})`
	background-image: url(${youtube});
`;

const EmailSocialLink = SocialLink.extend
	.attrs({
		title: 'Электронная почта',
		href: 'mailto:frontendu@gmail.com'
	})`
	background-image: url(${email});
`;

const MediumSocialLink = SocialLink.extend
	.attrs({
		title: 'Medium',
		href: 'https://medium.com/фронтенд-юность'
	})`
	background-image: url(${medium});
`;

const VKSocialLink = SocialLink.extend
	.attrs({
		title: 'Группа в VK',
		href: 'https://vk.com/frontend_u'
	})`
	background-image: url(${vk});
`;

const GithubSocialLink = SocialLink.extend
	.attrs({
		title: 'Github',
		href: 'https://github.com/frontendu'
	})`
	background-image: url(${github});
`;

export default (props) => (
	<SocialLinks {...props}>
		<SoundCloudSocialLink />
		<TelegramSocialLink />
		<PatreonSocialLink />
		<TwitterSocialLink />
		<InstagramSocialLink />
		<YouTubeSocialLink />
		<VKSocialLink />
		<EmailSocialLink />
		<MediumSocialLink />
		<GithubSocialLink />
	</SocialLinks>
);
