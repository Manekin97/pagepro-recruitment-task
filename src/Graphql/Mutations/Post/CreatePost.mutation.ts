import gql from 'graphql-tag';

const CREATE_POST = gql`
	mutation createPost($title: String!, $body: String!) {
		createPost(input: { title: $title, body: $body }) {
			id
			title
		}
	}
`;

export default CREATE_POST;
