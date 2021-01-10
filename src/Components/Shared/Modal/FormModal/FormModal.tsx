import React, { ReactNode } from 'react';
import styles from './FormModal.module.scss';
import { Form, Formik, FormikConfig } from 'formik';
import { ModalProps } from '../Modal';
import ModalBody from '../ModalBody/ModalBody';
import Button from '../../Button/Button';

interface FormModalProps<T> extends Omit<ModalProps, 'show'> {
	initialValues: T;
	onSubmit: FormikConfig<T>['onSubmit'];
	title: string;
	validate: FormikConfig<T>['validate'];
	children?: ReactNode;
}

const FormModal = <T extends object>({
	close,
	initialValues,
	onSubmit,
	title,
	validate,
	children,
}: FormModalProps<T>) => {
	return (
		<ModalBody className={styles.container}>
			<ModalBody.Header className={styles.header}>
				<h1 className={styles.title}>{title}</h1>
			</ModalBody.Header>

			<Formik<T> initialValues={initialValues} onSubmit={onSubmit} validate={validate} validateOnMount>
				{(props) => (
					<Form>
						<ModalBody.Content>{children}</ModalBody.Content>

						<ModalBody.Footer className={styles.footer}>
							<Button
								className={styles.button}
								onClick={() => {
									close();
									props.resetForm();
								}}
								type='button'
								theme='inverse'
							>
								Cancel
							</Button>

							<Button className={styles.submit} type='submit'>
								Save
							</Button>
						</ModalBody.Footer>
					</Form>
				)}
			</Formik>
		</ModalBody>
	);
};

export default FormModal;
