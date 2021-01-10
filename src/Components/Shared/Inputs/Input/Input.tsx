import { Field, FieldProps } from 'formik';
import React, { FC, HTMLProps } from 'react';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import styles from './Input.module.scss';

interface InputProps extends HTMLProps<HTMLInputElement> {
	label: string;
}

const Input: FC<InputProps> = ({ className, name, label, ...rest }) => {
	return (
		<Field name={name} {...rest}>
			{(props: FieldProps) => (
				<section className={styles.wrapper}>
					<label htmlFor={props.field.name}>{label}</label>

					<input className={[styles.input, className].join(' ')} {...props.field} />

					<ErrorMessage inputName={props.field.name} />
				</section>
			)}
		</Field>
	);
};

export default Input;
