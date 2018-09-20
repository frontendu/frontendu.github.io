import React from 'react';
import DonatePage from './donate'

export default (props) => <DonatePage {...props} />

export const query = graphql`
	query DonateHTMLPageQuery {
		site {
			siteMetadata {
				trackingId
			}
		}
	}
`;
