import React, { FC } from 'react';
import styles from './AddCommentModal.module.scss';
import { FormikConfig, FormikHelpers } from 'formik';
import { ModalPropsBase, Modal, FormModal } from '../../../../../Shared';
import { FormDataBase, Input, TextArea, validate, ValidationConfig, validators } from '../../../../../Shared/Inputs';

interface FormData extends FormDataBase {
	name: string;
	body: string;
	email: string;
}

interface AddCommentModalProps extends ModalPropsBase {
	onSubmit: FormikConfig<FormData>['onSubmit'];
}

const initialValues: FormData = { name: '', body: '', email: '' };

const validatorsConfig: ValidationConfig = {
	name: [
		validators.required,
		(name, value) => validators.minLength(name, value, 2),
		(name, value) => validators.maxLength(name, value, 80),
	],
	body: [
		validators.required,
		(name, value) => validators.minLength(name, value, 2),
		(name, value) => validators.maxLength(name, value, 1000),
	],
	email: [
		validators.required,
		validators.email,
		(name, value) => validators.minLength(name, value, 5),
		(name, value) => validators.maxLength(name, value, 80),
	],
};

const AddCommentModal: FC<AddCommentModalProps> = ({ show, close, onSubmit }) => {
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
					title='Add comment'
				>
					<div className={styles.wrapper}>
						<Input className={styles.input} label='Name' id='name' name='name' placeholder='Name' />
						<Input className={styles.input} label='Email' id='email' name='email' placeholder='Email' />

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

export default AddCommentModal;
