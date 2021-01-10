import React, { FC } from 'react';
import styles from './Button.module.scss';

interface ButtonProps {
	theme?: 'default' | 'inverse';
	type?: 'button' | 'submit' | 'reset';
}

const Button: FC<ButtonProps & React.HTMLProps<HTMLButtonElement>> = ({
	children,
	className,
	theme = 'default',
	type = 'button',
	...rest
}) => {
	return (
		<button {...rest} className={[styles.button, className, styles[theme]].join(' ')} type={type}>
			{children}
		</button>
	);
};

export default Button;
