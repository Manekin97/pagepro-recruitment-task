import gql from 'graphql-tag';

const CREATE_COMMENT = gql`
	mutation createComment($name: String!, $body: String!, $email: String!) {
		createComment(input: { name: $name, email: $email, body: $body }) {
			id
			name
			body
			email
		}
	}
`;

export default CREATE_COMMENT;
