import React, { FC } from 'react';
import { useScrollToTop } from '../../../Helpers/Hooks';
import styles from './BaseLayout.module.scss';

const BaseLayout: FC = ({ children }) => {
	useScrollToTop();

	return <main className={styles.container}>{children}</main>;
};

export default BaseLayout;
