import React from 'react';
import styles from './EmptyContent.module.scss';
import { Icons } from '..';

const EmptyContent = () => {
	return (
		<div className={styles.wrapper}>
			<Icons.NoContentIcon className={styles.icon} />
			<p className={styles.text}>There is no content or an error occurred</p>
		</div>
	);
};

export default EmptyContent;
