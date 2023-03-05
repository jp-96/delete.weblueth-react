import React, { useCallback, useEffect } from 'react';
import { BoundCallback } from '../wb/WbContext';
import { WbxDeviceEffector, useWbxActor } from './WbxContext';

interface Props {
    //children?: any;
    onDeviceBound?: BoundCallback<BluetoothDevice>;
}

export function WbxDevice(props: Props) {
    const [state] = useWbxActor();

    const cb = useCallback<BoundCallback<BluetoothDevice>>((bound) => {
        if (props.onDeviceBound) {
            props.onDeviceBound(bound);
        }
    }, []);
    useEffect(WbxDeviceEffector(state, cb), []);

    return (
        <React.Fragment />
    );
}
