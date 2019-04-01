const trackingId = '44962126';

module.exports = {
	siteMetadata: {
		trackingId,
		title: 'Фронтенд Молодости',
	},
	plugins: [
		'gatsby-plugin-react-helmet',
		{
			resolve: 'gatsby-plugin-styled-components',
			options: {
				displayName: true
			}
		},
		{
			resolve: `gatsby-plugin-yandex-metrika`,
			options: {
				trackingId,
				webvisor: true,

				// Temporary hack
				trackHash: `true,
				triggerEvent: true
				`
			}
		}
	]
}
