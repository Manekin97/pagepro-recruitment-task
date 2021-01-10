import React, { FC } from 'react';
import styles from './UserTile.module.scss';
import { User } from '../../../../../Graphql/Graphql';
import { generatePath } from 'react-router-dom';
import { routes } from '../../../../../Helpers';
import { ButtonLink } from '../../../../Shared';
import Skeleton from 'react-loading-skeleton';

interface UserTileProps {
	user?: Pick<User, 'id' | 'name' | 'company'>;
	loading?: boolean;
}

const UserTile: FC<UserTileProps> = ({ user, loading = false }) => {
	return (
		<li className={styles.tile}>
			<h1 className={styles.name}>{loading ? <Skeleton /> : user?.name}</h1>

			<section>
				<p className={styles.companyName}>{loading ? <Skeleton /> : user?.company?.name}</p>

				<p className={styles.catchPhrase}>{loading ? <Skeleton count={2} /> : user?.company?.catchPhrase}</p>

				<strong className={styles.bs}>{loading ? <Skeleton count={2} /> : user?.company?.bs}</strong>
			</section>

			{loading ? (
				<Skeleton height={60} />
			) : (
				<ButtonLink className={styles.link} to={generatePath(routes.userDetails, { userId: user?.id ?? '1' })}>
					Details
				</ButtonLink>
			)}
		</li>
	);
};

export default UserTile;
