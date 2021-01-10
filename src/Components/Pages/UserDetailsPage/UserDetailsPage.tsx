import { useMutation, useQuery } from '@apollo/client';
import React, { useCallback, useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { useLocation, useParams } from 'react-router-dom';
import {
	CreatePostMutation,
	CreatePostMutationVariables,
	DeletePostMutation,
	DeletePostMutationVariables,
	GetUserDetailsQuery,
	GetUserDetailsQueryVariables,
} from '../../../Graphql/Graphql';
import { CREATE_POST, DELETE_POST } from '../../../Graphql/Mutations';
import { GET_USER_DETAILS } from '../../../Graphql/Queries';
import { IconButton, Icons, PortalIn } from '../../Shared';
import NewPostModal from './NewPostModal/NewPostModal';
import Posts from './Posts/Posts';

export interface UserDetailsPageRouteParams {
	userId: string;
}

export interface UserDetailsPageRouteState {
	postId: string;
}

const UserDetailsPage = () => {
	const { state } = useLocation<UserDetailsPageRouteState>();
	const [showModal, setShowModal] = useState(false);
	const { userId } = useParams<UserDetailsPageRouteParams>();

	const [createPost] = useMutation<CreatePostMutation, CreatePostMutationVariables>(CREATE_POST);
	const [_deletePost] = useMutation<DeletePostMutation, DeletePostMutationVariables>(DELETE_POST);

	const { data, loading } = useQuery<GetUserDetailsQuery, GetUserDetailsQueryVariables>(GET_USER_DETAILS, {
		variables: {
			id: userId,
		},
	});

	const deletePost = useCallback(
		(userId: string, postId: string) =>
			_deletePost({
				variables: { id: postId },
				update(cache, { data }) {
					const cachedQueryResult = cache.readQuery<GetUserDetailsQuery, GetUserDetailsQueryVariables>({
						query: GET_USER_DETAILS,
						variables: {
							id: userId,
						},
					});

					const existingPosts = cachedQueryResult?.user?.posts?.data ?? [];
					const newPosts = existingPosts.filter((_post) => _post?.id !== postId);

					data?.deletePost &&
						cache.writeQuery<GetUserDetailsQuery, GetUserDetailsQueryVariables>({
							query: GET_USER_DETAILS,
							data: {
								...cachedQueryResult,
								user: {
									...cachedQueryResult?.user,
									posts: {
										...cachedQueryResult?.user?.posts,
										data: newPosts,
									},
								},
							},
							variables: {
								id: userId,
							},
						});
				},
				optimisticResponse: {
					__typename: 'Mutation',
					deletePost: true,
				},
			}),
		[_deletePost]
	);

	const create = (title: string, body: string) => {
		createPost({
			variables: {
				title,
				body,
			},
			update(cache, { data }) {
				const cachedQueryResult = cache.readQuery<GetUserDetailsQuery, GetUserDetailsQueryVariables>({
					query: GET_USER_DETAILS,
					variables: {
						id: userId,
					},
				});

				const existingPosts = cachedQueryResult?.user?.posts?.data ?? [];
				const newPost = data?.createPost;

				newPost &&
					cache.writeQuery<GetUserDetailsQuery, GetUserDetailsQueryVariables>({
						query: GET_USER_DETAILS,
						data: {
							user: {
								...cachedQueryResult?.user,
								posts: {
									data: [newPost, ...existingPosts],
								},
							},
						},
						variables: {
							id: userId,
						},
					});
			},
			optimisticResponse: {
				__typename: 'Mutation',
				createPost: {
					__typename: 'Post',
					id: null,
					title: null,
				},
			},
		});
	};

	useEffect(() => {
		if (state && state.postId) {
			deletePost(userId, state.postId);
		}
	}, [deletePost, state, userId]);

	const toggleModal = () => setShowModal((show) => !show);

	return (
		<>
			<PortalIn id='action'>
				{data?.user?.posts?.data && data.user.id && <IconButton icon={Icons.AddIcon} onClick={toggleModal} />}
			</PortalIn>

			<PortalIn id='name'>{loading ? <Skeleton height='100%' width='25%' /> : data?.user?.name}</PortalIn>

			<Posts posts={data?.user?.posts?.data} deletePost={deletePost} loading={loading} />

			<NewPostModal show={showModal} close={toggleModal} onSubmit={({ title, body }) => create(title, body)} />
		</>
	);
};

export default UserDetailsPage;
