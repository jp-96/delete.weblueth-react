import React, { useState } from 'react';
import { WbxBoundCallback, WbxDevice } from '../../../src';

type Props = {
    infoName: 'id' | 'name';
}

const defaultInfo = '(none)';

export default function MicroBitInfo(props: Props) {
    const [info, setInfo] = useState<string>(defaultInfo);

    const onDeviceBound: WbxBoundCallback<BluetoothDevice> = bound => {
        if (bound.binding) {
            setInfo(bound.target[props.infoName] ?? defaultInfo);
        } else {
            setInfo(defaultInfo);
        }
    }
    return (
        <React.Fragment>
            <WbxDevice onDeviceBound={onDeviceBound} />
            {info}
        </React.Fragment>
    );
}
