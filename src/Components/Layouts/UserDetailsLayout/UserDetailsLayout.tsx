import React, { FC } from 'react';
import styles from './UserDetailsLayout.module.scss';
import { PortalContextProvider } from '../../Shared';
import UserNavigationBar from './UserNavigationBar/UserNavigationBar';
import { useScrollToTop } from '../../../Helpers/Hooks';

const UserDetailsLayout: FC = ({ children }) => {
	useScrollToTop();

	return (
		<PortalContextProvider>
			<UserNavigationBar />
			<main className={styles.container}>{children}</main>
		</PortalContextProvider>
	);
};

export default UserDetailsLayout;
