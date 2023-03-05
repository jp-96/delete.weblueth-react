import React, { useCallback, useEffect } from 'react';
import { BoundCallback, CustomServices } from '../statemachine/Context';
import { ServicesEffector, useMicrobitActor } from './MicrobitContext';

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
