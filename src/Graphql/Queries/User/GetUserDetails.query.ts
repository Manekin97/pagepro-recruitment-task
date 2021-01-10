import gql from 'graphql-tag';

const GET_USER_DETAILS = gql`
	query getUserDetails($id: ID!) {
		user(id: $id) {
			id
			name
			posts(options: {}) {
				data {
					id
					title
				}
			}
		}
	}
`;

export default GET_USER_DETAILS;
