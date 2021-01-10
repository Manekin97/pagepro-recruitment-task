import React, { FC } from 'react';
import styles from './Posts.module.scss';
import Skeleton from 'react-loading-skeleton';
import { Maybe, Post } from '../../../../Graphql/Graphql';
import PostTile from './PostTile/PostTile';
import { EmptyContent } from '../../../Shared';

interface PostsProps {
	posts: Maybe<Array<Maybe<Post>>> | undefined;
	loading: boolean;
	deletePost: (userId: string, postId: string) => void;
	itemsPerPage?: number;
}

/**
 * `${post.id}${i}` wouldn't be needed in a real life scenario,
 *  I would've just used post.id but since the backend
 *  always return the same id (101) I concatenate its id
 *  with map index - just so there are no errors in the console
 */

const Posts: FC<PostsProps> = ({ posts, loading, deletePost, itemsPerPage = 8 }) => {
	if (!loading && (!posts || (posts?.length ?? 0)) <= 0) {
		return <EmptyContent />;
	}

	return (
		<ul className={styles.posts}>
			{loading
				? Array.from(new Array(itemsPerPage)).map((_, i) => (
						<Skeleton className={styles.skeleton} height={80} key={i} />
				  ))
				: posts?.map(
						(post, i) => post && <PostTile post={post} deletePost={deletePost} key={`${post.id}${i}`} />
				  )}
		</ul>
	);
};

export default Posts;
