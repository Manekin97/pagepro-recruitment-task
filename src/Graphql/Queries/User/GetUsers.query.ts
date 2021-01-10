import gql from 'graphql-tag';

const GET_USERS = gql`
	query getUsers {
		users(options: {}) {
			data {
				id
				name
				company {
					name
					catchPhrase
					bs
				}
			}
		}
	}
`;

export default GET_USERS;
