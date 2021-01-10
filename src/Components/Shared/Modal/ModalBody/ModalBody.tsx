import React, { FC, HTMLProps } from 'react';

interface FormModalComposition {
	Header: FC<HTMLProps<HTMLElement>>;
	Content: FC<HTMLProps<HTMLElement>>;
	Footer: FC<HTMLProps<HTMLElement>>;
}

const ModalBody: FC<HTMLProps<HTMLElement>> & FormModalComposition = ({ children, ...rest }) => {
	return <section {...rest}>{children}</section>;
};

ModalBody.Header = function FormModalHeader({ children, ...rest }) {
	return <header {...rest}>{children}</header>;
};

ModalBody.Content = function FormModalContent({ children, ...rest }) {
	return <section {...rest}>{children}</section>;
};

ModalBody.Footer = function FormModalFooter({ children, ...rest }) {
	return <section {...rest}>{children}</section>;
};

export default ModalBody;
