import { FormikErrors } from 'formik';

const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const requiredValidator = (name: string, value: string | number) => {
	if (!value) {
		return `${name} is required.`;
	}
};

const emailValidator = (name: string, value: string | number) => {
	if (!emailRegex.test(String(value))) {
		return `${name} format is invalid.`;
	}
};

const minLengthValidator = (name: string, value: string | number, minLength: number) => {
	if (String(value).length < minLength) {
		return `${name} has to be at least ${minLength} characters long.`;
	}
};

const maxLengthValidator = (name: string, value: string | number, maxLength: number) => {
	if (String(value).length > maxLength) {
		return `${name} has to be at most ${maxLength} characters long.`;
	}
};

export const validators = {
	required: requiredValidator,
	email: emailValidator,
	minLength: minLengthValidator,
	maxLength: maxLengthValidator,
};

export interface Config {
	[key: string]: Array<(name: string, value: string | number, ...args: Array<any>) => string | undefined>;
}

export type BaseValuesType = {
	[key: string]: string | number;
};

export const validate = (values: Record<string, string | number>, config: Config) => {
	const errors: FormikErrors<Record<string, string>> = {};

	Object.keys(values).forEach((key) => {
		const value = values[key];
		const validators = config[key];

		for (const validator of validators) {
			const result = validator(key, value);

			if (result) {
				errors[key] = result;
				break;
			}
		}
	});

	return errors;
};
