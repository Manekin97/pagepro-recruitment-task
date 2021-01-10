import React, { FC } from 'react';
import styles from './NewPostModal.module.scss';
import { FormikConfig, FormikHelpers } from 'formik';
import { FormModal, Input, Modal, ModalPropsBase, TextArea } from '../../../Shared';
import { FormDataBase, validators, validate, ValidationConfig } from '../../../Shared/Inputs';

interface FormData extends FormDataBase {
	title: string;
	body: string;
}

interface NewPostModalProps extends ModalPropsBase {
	onSubmit: FormikConfig<FormData>['onSubmit'];
}

const initialValues: FormData = { title: '', body: '' };

const validatorsConfig: ValidationConfig = {
	title: [
		validators.required,
		(name, value) => validators.minLength(name, value, 2),
		(name, value) => validators.maxLength(name, value, 160),
	],
	body: [
		validators.required,
		(name, value) => validators.minLength(name, value, 2),
		(name, value) => validators.maxLength(name, value, 1000),
	],
};

const NewPostModal: FC<NewPostModalProps> = ({ show, close, onSubmit }) => {
	const submitHandler = (data: FormData, formikHelpers: FormikHelpers<FormData>) => {
		onSubmit(data, formikHelpers);
		formikHelpers.resetForm();
		close();
	};

	return (
		<Modal
			show={show}
			renderBody={() => (
				<FormModal<FormData>
					validate={(values) => validate(values, validatorsConfig)}
					close={close}
					onSubmit={submitHandler}
					initialValues={initialValues}
					title='Add post'
				>
					<div className={styles.wrapper}>
						<Input className={styles.input} label='Title' id='title' name='title' placeholder='Title' />
						<TextArea
							className={styles.input}
							rows={10}
							label='Body'
							id='body'
							name='body'
							placeholder='Body'
						/>
					</div>
				</FormModal>
			)}
		/>
	);
};

export default NewPostModal;
