import Input from './Input/Input';
import TextArea from './TextArea/TextArea';
import { validators, Config, validate, BaseValuesType } from './Validators/validators';

export { Input, TextArea, validators, validate };

export type ValidationConfig = Config;
export type FormDataBase = BaseValuesType;
