import React, { useCallback, useEffect } from 'react';
import { BoundCallback, CustomServices } from '../wb/WbContext';
import { WbxServicesEffector, useWbxActor } from './WbxContext';

interface Props {
    //children?: any;
    onServicesBound?: BoundCallback<CustomServices>;
}

export function MicrobitServices(props: Props) {
    const [state] = useWbxActor();

    const cb = useCallback<BoundCallback<CustomServices>>((bound) => {
        if (props.onServicesBound) {
            props.onServicesBound(bound);
        }
    }, []);
    useEffect(WbxServicesEffector(state, cb), []);

    return (
        <React.Fragment />
    );
}
