import React, { FC } from 'react';
import styles from './Users.module.scss';
import { GetUsersQuery } from '../../../../Graphql/Graphql';
import UserTile from './UserTile/UserTile';

interface UsersProps {
	usersData: GetUsersQuery['users'];
	loading: boolean;
	itemsPerPage?: number;
}

const Users: FC<UsersProps> = ({ usersData, loading, itemsPerPage = 8 }) => {
	const users = usersData?.data;

	return (
		<ul className={styles.users}>
			{loading
				? Array.from(new Array(itemsPerPage)).map((_, i) => <UserTile loading={loading} key={i} />)
				: users?.map((user) => user && <UserTile user={user} key={user.id} />)}
		</ul>
	);
};

export default Users;
