import React, { useCallback, useEffect } from 'react';
import { BoundCallback } from '../wb/WbContext';
import { DeviceEffector, useMicrobitActor } from './WbxContext';

interface Props {
    //children?: any;
    onDeviceBound?: BoundCallback<BluetoothDevice>;
}

export function MicrobitDevice(props: Props) {
    const [state] = useMicrobitActor();

    const cb = useCallback<BoundCallback<BluetoothDevice>>((bound) => {
        if (props.onDeviceBound) {
            props.onDeviceBound(bound);
        }
    }, []);
    useEffect(DeviceEffector(state, cb), []);

    return (
        <React.Fragment />
    );
}
