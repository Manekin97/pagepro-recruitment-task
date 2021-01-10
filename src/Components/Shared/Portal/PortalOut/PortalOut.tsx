import React, { FC, useContext } from 'react';
import { PortalContext } from '../PortalContextProvider/PortalContextProvider';

interface PortalOutProps {
	id: string;
}

const PortalOut: FC<PortalOutProps> = ({ id }) => {
	const { portalMap } = useContext(PortalContext) ?? {};

	return <>{portalMap?.get(id) ?? null}</>;
};

export default PortalOut;
