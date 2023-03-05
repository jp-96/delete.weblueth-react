import React, { useCallback, useEffect } from 'react';
import { WbBoundCallback, WbServices } from '../wb/WbContext';
import { WbxServicesEffector, useWbxActor } from './WbxContext';

interface Props {
    //children?: any;
    onServicesBound?: WbBoundCallback<WbServices>;
}

export function WbxServices(props: Props) {
    const [state] = useWbxActor();

    const cb = useCallback<WbBoundCallback<WbServices>>((bound) => {
        if (props.onServicesBound) {
            props.onServicesBound(bound);
        }
    }, []);
    useEffect(WbxServicesEffector(state, cb), []);

    return (
        <React.Fragment />
    );
}
