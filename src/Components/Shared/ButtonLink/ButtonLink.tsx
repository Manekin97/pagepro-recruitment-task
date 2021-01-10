import React, { FC } from 'react';
import styles from './ButtonLink.module.scss';
import { Link, LinkProps } from 'react-router-dom';

const ButtonLink: FC<LinkProps> = ({ children, className, ...rest }) => {
	return (
		<Link className={[styles.link, className].join(' ')} {...rest}>
			{children}
		</Link>
	);
};

export default ButtonLink;
