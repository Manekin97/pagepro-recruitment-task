import { FC, useContext, useEffect } from 'react';
import { PortalContext } from '../PortalContextProvider/PortalContextProvider';

interface PortalInProps {
	id: string;
}

const PortalIn: FC<PortalInProps> = ({ id, children }) => {
	const { addPortalItem, removePortalItem } = useContext(PortalContext) ?? {};

	useEffect(() => {
		addPortalItem && addPortalItem(id, children);

		return () => removePortalItem && removePortalItem(id);
	}, [id, children, addPortalItem, removePortalItem]);

	return null;
};

export default PortalIn;
