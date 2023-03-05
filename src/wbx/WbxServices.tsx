import React, { useCallback, useEffect } from 'react';
import { BoundCallback, CustomServices } from '../wb/WbContext';
import { ServicesEffector, useMicrobitActor } from './WbxContext';

interface Props {
    //children?: any;
    onServicesBound?: BoundCallback<CustomServices>;
}

export function MicrobitServices(props: Props) {
    const [state] = useMicrobitActor();

    const cb = useCallback<BoundCallback<CustomServices>>((bound) => {
        if (props.onServicesBound) {
            props.onServicesBound(bound);
        }
    }, []);
    useEffect(ServicesEffector(state, cb), []);

    return (
        <React.Fragment />
    );
}
