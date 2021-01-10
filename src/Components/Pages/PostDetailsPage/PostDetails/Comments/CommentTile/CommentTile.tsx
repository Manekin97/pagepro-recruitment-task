import React, { FC } from 'react';
import styles from './CommentTile.module.scss';
import { Comment } from '../../../../../../Graphql/Graphql';
import Skeleton from 'react-loading-skeleton';

interface CommentTile {
	comment?: Pick<Comment, 'id' | 'name' | 'body' | 'email'>;
	loading?: boolean;
}

const CommentTile: FC<CommentTile> = ({ comment, loading = false }) => {
	return (
		<li className={styles.tile}>
			<div className={styles.wrapper}>
				<span className={styles.name}>{loading || !comment?.id ? <Skeleton width='50%' /> : comment.name}</span>

				<address className={styles.address}>
					{loading || !comment?.id ? (
						<Skeleton width='50%' />
					) : (
						<a href={`mailto:${comment.email}`}>{comment.email}</a>
					)}
				</address>
			</div>

			<p className={styles.body}>{loading || !comment?.id ? <Skeleton count={4} /> : comment.body}</p>
		</li>
	);
};

export default CommentTile;
