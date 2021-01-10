import React from 'react';
import styles from './UserNavigationBar.module.scss';
import { IconButton, Icons, PortalOut } from '../../../Shared';
import { useHistory, useLocation } from 'react-router-dom';
import UserName from './UserName/UserName';

const UserNavigationBar = () => {
	const history = useHistory();
	const { pathname } = useLocation();

	const goBack = () => {
		const lastSegment = pathname.lastIndexOf('/');
		const newPath = pathname.substring(0, lastSegment);

		history.push(newPath);
	};

	return (
		<nav className={styles.nav}>
			<IconButton icon={Icons.LeftArrowIcon} onClick={goBack} />

			<UserName>
				<PortalOut id='name' />
			</UserName>

			<div className={styles.actionButton}>
				<PortalOut id='action' />
			</div>
		</nav>
	);
};

export default UserNavigationBar;
