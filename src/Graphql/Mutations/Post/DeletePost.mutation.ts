import gql from 'graphql-tag';

const DELETE_POST = gql`
	mutation deletePost($id: ID!) {
		deletePost(id: $id)
	}
`;

export default DELETE_POST;
