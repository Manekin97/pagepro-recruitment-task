import React, { FC } from 'react';
import styles from './PostTile.module.scss';
import { generatePath, useHistory, useParams } from 'react-router-dom';
import { Post } from '../../../../../Graphql/Graphql';
import { routes } from '../../../../../Helpers';
import { UserDetailsPageRouteParams } from '../../UserDetailsPage';
import { IconButton, Icons } from '../../../../Shared';
import Skeleton from 'react-loading-skeleton';

interface PostProps {
	post: Post;
	deletePost: (userId: string, postId: string) => void;
}

const PostTile: FC<PostProps> = ({ post, deletePost }) => {
	const history = useHistory();
	const { userId } = useParams<UserDetailsPageRouteParams>();
	const onDeleteClick = () => deletePost(userId, post.id ?? '');

	const goToDetails = () =>
		post.id && history.push(generatePath(routes.postDetails, { postId: post.id, userId: userId }));

	if (post.id === null) {
		return <Skeleton height={80} />;
	}

	return (
		<li className={styles.tile}>
			<div className={styles.wrapper}>
				<IconButton icon={Icons.TrashIcon} onClick={onDeleteClick} />
				<span className={styles.title}>{post.title}</span>
			</div>

			<IconButton icon={Icons.CaretIcon} onClick={goToDetails} />
		</li>
	);
};

export default PostTile;
