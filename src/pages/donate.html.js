export { default } from './donate';

export const query = graphql`
	query DonateHTMLPageQuery {
		site {
			siteMetadata {
				trackingId
			}
		}
	}
`;
