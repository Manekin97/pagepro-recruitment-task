import React, { FC, useState } from 'react';
import styles from './Comments.module.scss';
import CommentTile from './CommentTile/CommentTile';
import {
	CommentsPage,
	CreateCommentMutation,
	CreateCommentMutationVariables,
	GetPostDetailsQuery,
	GetPostDetailsQueryVariables,
	Maybe,
} from '../../../../../Graphql/Graphql';
import AddCommentModal from './AddCommentModal/AddCommentModal';
import { useMutation } from '@apollo/client';
import { CREATE_COMMENT } from '../../../../../Graphql/Mutations';
import { PostDetailsPageRouteParams } from '../../PostDetailsPage';
import { useParams } from 'react-router-dom';
import { GET_POST_DETAILS } from '../../../../../Graphql/Queries';
import { Button, EmptyContent } from '../../../../Shared';

interface CommentsProps {
	comments: Maybe<CommentsPage> | undefined;
	loading: boolean;
	itemsPerPage?: number;
}

/**
 * `${comment.id}${i}` wouldn't be needed in a real life scenario,
 *  I would've just used comment.id but since the backend
 *  always return the same id (501) I concatenate its id
 *  with map index - just so there are no errors in the console
 */

const Comments: FC<CommentsProps> = ({ comments, loading, itemsPerPage = 6 }) => {
	const { postId } = useParams<PostDetailsPageRouteParams>();
	const [showModal, setShowModal] = useState(false);
	const [showComments, setShowComments] = useState(false);

	const [createComment] = useMutation<CreateCommentMutation, CreateCommentMutationVariables>(CREATE_COMMENT);

	const toggleComments = () => setShowComments((show) => !show);
	const toggleModal = () => setShowModal((show) => !show);

	const create = (name: string, email: string, body: string) =>
		createComment({
			variables: {
				name,
				email,
				body,
			},
			update(cache, { data }) {
				const cachedQueryResult = cache.readQuery<GetPostDetailsQuery, GetPostDetailsQueryVariables>({
					query: GET_POST_DETAILS,
					variables: {
						id: postId,
					},
				});

				const comments = cachedQueryResult?.post?.comments?.data ?? [];
				const newComment = data?.createComment;

				newComment &&
					cache.writeQuery<GetPostDetailsQuery, GetPostDetailsQueryVariables>({
						query: GET_POST_DETAILS,
						variables: {
							id: postId,
						},
						data: {
							...cachedQueryResult,
							post: {
								...cachedQueryResult?.post,
								comments: {
									...cachedQueryResult?.post?.comments,
									data: [newComment, ...comments],
								},
							},
						},
					});
			},
			optimisticResponse: {
				__typename: 'Mutation',
				createComment: {
					__typename: 'Comment',
					id: null,
					body: null,
					email: null,
					name: null,
				},
			},
		});

	if (!loading && (!comments || (comments.data?.length ?? 0) <= 0)) {
		return <EmptyContent />;
	}

	return (
		<section className={styles.container}>
			<header className={styles.buttons}>
				<Button className={styles.button} onClick={toggleComments}>
					{showComments ? 'Hide comments' : 'Show comments'}
				</Button>

				<Button className={styles.button} onClick={toggleModal}>
					Add comment
				</Button>
			</header>

			{showComments && (
				<ul className={styles.comments}>
					{loading
						? Array.from(new Array(itemsPerPage)).map((_, i) => <CommentTile loading={loading} key={i} />)
						: comments?.data?.map(
								(comment, i) =>
									comment && (
										<CommentTile comment={comment} key={`${comment.id}${i}`} loading={loading} />
									)
						  )}
				</ul>
			)}

			<AddCommentModal
				show={showModal}
				close={toggleModal}
				onSubmit={({ name, email, body }) => {
					create(name, email, body);
					setShowComments(true);
				}}
			/>
		</section>
	);
};

export default Comments;
