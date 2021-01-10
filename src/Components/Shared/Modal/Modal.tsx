import React, { FC, useEffect, useRef } from 'react';
import styles from './Modal.module.scss';
import { createPortal } from 'react-dom';
import { CSSTransition } from 'react-transition-group';

const modalRoot = document.getElementById('modal-portal');

interface ModalPropsBase {
	show: boolean;
	renderBody: () => JSX.Element;
}

export type ModalProps = Omit<ModalPropsBase, 'renderBody'> & {
	close: () => void;
};

const Modal: FC<ModalPropsBase> = ({ show, renderBody }) => {
	const contentRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		contentRef.current && show && contentRef.current.focus();
	}, [show]);

	const modalHtml = (
		<CSSTransition
			in={show}
			timeout={300}
			classNames={{
				enter: styles.enter,
				enterActive: styles.enterActive,
				enterDone: styles.enterDone,
				exit: styles.exit,
				exitActive: styles.exitActive,
			}}
		>
			<div className={styles.modal}>
				<CSSTransition
					in={show}
					timeout={200}
					classNames={{
						enter: styles.bodyEnter,
						enterActive: styles.bodyEnterActive,
						enterDone: styles.bodyEnterDone,
						exit: styles.bodyExit,
						exitActive: styles.bodyExitActive,
					}}
				>
					<div ref={contentRef} className={styles.modalBody}>
						{renderBody()}
					</div>
				</CSSTransition>
			</div>
		</CSSTransition>
	);

	return createPortal(modalHtml, modalRoot ?? document.body);
};

export default Modal;
