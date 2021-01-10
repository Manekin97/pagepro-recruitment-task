import React, { FC, ReactNode, useCallback, useState } from 'react';

interface IPortalContext {
	portalMap: Map<string, ReactNode>;
	addPortalItem: (id: string, component: ReactNode) => void;
	removePortalItem: (id: string) => void;
}

export const PortalContext = React.createContext<IPortalContext>(null!);

export const PortalContextProvider: FC = ({ children }) => {
	const [portalMap, setPortalMap] = useState<Map<string, ReactNode>>(new Map<string, ReactNode>());

	const addPortalItem = useCallback(
		(id: string, component: ReactNode) =>
			setPortalMap((currMap) => {
				currMap.set(id, component);
				return new Map(currMap);
			}),
		[]
	);

	const removePortalItem = useCallback(
		(id: string) =>
			setPortalMap((currMap) => {
				currMap.delete(id);
				return new Map(currMap);
			}),
		[]
	);

	return <PortalContext.Provider value={{ portalMap, addPortalItem, removePortalItem }}>{children}</PortalContext.Provider>;
};

export default PortalContextProvider;
