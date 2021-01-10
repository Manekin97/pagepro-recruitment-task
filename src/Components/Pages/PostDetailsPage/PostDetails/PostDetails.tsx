import React, { FC } from 'react';
import styles from './PostDetails.module.scss';
import { Maybe, Post } from '../../../../Graphql/Graphql';
import Comments from './Comments/Comments';
import Skeleton from 'react-loading-skeleton';
import { EmptyContent } from '../../../Shared';

interface PostDetailsProps {
	post: Maybe<Pick<Post, 'id' | 'title' | 'body' | 'comments'>> | undefined;
	loading: boolean;
}

const PostDetails: FC<PostDetailsProps> = ({ post, loading }) => {
	if (!loading && !post) {
		return <EmptyContent />;
	}

	return (
		<article>
			<h1 className={styles.title}>{!loading ? post?.title : <Skeleton width='50%' />}</h1>
			<p className={styles.body}>{!loading ? post?.body : <Skeleton count={8} />}</p>

			<Comments comments={post?.comments} loading={loading} />
		</article>
	);
};

export default PostDetails;
