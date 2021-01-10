import { Field, FieldProps } from 'formik';
import React, { FC, HTMLProps } from 'react';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import styles from './TextArea.module.scss';

interface TextAreaProps extends HTMLProps<HTMLTextAreaElement> {
	label: string;
}

const TextArea: FC<TextAreaProps> = ({ className, name, label, rows, ...rest }) => {
	return (
		<Field name={name} {...rest}>
			{(props: FieldProps) => (
				<section className={styles.wrapper}>
					<label htmlFor={props.field.name}>{label}</label>

					<textarea className={[styles.textarea, className].join(' ')} {...props.field} rows={rows} />

					<ErrorMessage inputName={props.field.name} />
				</section>
			)}
		</Field>
	);
};

export default TextArea;
