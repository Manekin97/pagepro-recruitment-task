import React, { FC } from 'react';
import styles from './UserName.module.scss';

const UserName: FC = ({ children }) => {
	return <h1 className={styles.name}>{children}</h1>;
};

export default UserName;
