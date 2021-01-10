import gql from 'graphql-tag';

const GET_POST_DETAILS = gql`
	query getPostDetails($id: ID!) {
		post(id: $id) {
			id
			title
			body
			user {
				id
				name
			}
			comments {
				data {
					id
					name
					body
					email
				}
			}
		}
	}
`;

export default GET_POST_DETAILS;
