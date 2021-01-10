import React, { FC, SVGProps } from 'react';
import styles from './IconButton.module.scss';

interface IconButtonProps {
	icon: (props: SVGProps<SVGSVGElement>) => any;
}

const IconButton: FC<IconButtonProps & React.HTMLProps<HTMLButtonElement>> = ({ icon: Icon, className, ...rest }) => {
	return (
		<button {...rest} className={[styles.button, className].join(' ')} type='button'>
			<Icon className={styles.icon} />
		</button>
	);
};

export default IconButton;
