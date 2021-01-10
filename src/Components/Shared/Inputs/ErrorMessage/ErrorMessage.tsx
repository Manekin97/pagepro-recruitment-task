import React, { FC } from 'react';
import styles from './ErrorMessage.module.scss';
import { ErrorMessage as FormikErrorMessage } from 'formik';

interface ErrorMessageProps {
	inputName: string;
}

const ErrorMessage: FC<ErrorMessageProps> = ({ inputName }) => {
	return <FormikErrorMessage render={(error) => <em className={styles.message}>{error}</em>} name={inputName} />;
};

export default ErrorMessage;
