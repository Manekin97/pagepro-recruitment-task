import { useApolloClient, useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { generatePath, useHistory, useParams } from 'react-router-dom';
import {
	GetPostDetailsQuery,
	GetPostDetailsQueryVariables,
	GetUserDetailsQuery,
	GetUserDetailsQueryVariables,
	User,
} from '../../../Graphql/Graphql';
import { GET_POST_DETAILS, GET_USER_DETAILS } from '../../../Graphql/Queries';
import { routes } from '../../../Helpers';
import { IconButton, Icons, PortalIn } from '../../Shared';
import { UserDetailsPageRouteState } from '../UserDetailsPage/UserDetailsPage';
import PostDetails from './PostDetails/PostDetails';

export interface PostDetailsPageRouteParams {
	userId: string;
	postId: string;
}

const PostDetailsPage = () => {
	const history = useHistory<UserDetailsPageRouteState>();
	const client = useApolloClient();
	const { postId, userId } = useParams<PostDetailsPageRouteParams>();

	const [cachedUser, setCachedUser] = useState<User | null>(null);

	const { data, loading } = useQuery<GetPostDetailsQuery, GetPostDetailsQueryVariables>(GET_POST_DETAILS, {
		variables: {
			id: postId,
		},
	});

	const onDeleteClick = () =>
		history.push(
			generatePath(routes.userDetails, {
				userId,
			}),
			{
				postId,
			}
		);

	useEffect(() => {
		const cachedQueryResult = client.readQuery<GetUserDetailsQuery, GetUserDetailsQueryVariables>({
			query: GET_USER_DETAILS,
			variables: {
				id: userId,
			},
		});

		setCachedUser(cachedQueryResult?.user ?? null);
	}, [client, userId]);

	return (
		<div>
			<PortalIn id='action'>
				{data?.post?.id && <IconButton icon={Icons.TrashIcon} onClick={onDeleteClick} />}
			</PortalIn>

			<PortalIn id='name'>
				{!cachedUser && loading ? (
					<Skeleton height='100%' width='25%' />
				) : (
					cachedUser?.name || data?.post?.user?.name
				)}
			</PortalIn>

			<PostDetails post={data?.post} loading={loading} />
		</div>
	);
};

export default PostDetailsPage;
