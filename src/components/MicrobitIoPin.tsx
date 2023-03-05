import React, { useEffect, useState } from 'react';
import { CustomEventCallback, ServiceProps } from '../wbx/WbxContext';
import { BoundCallback } from '../wb/WbContext';
import { MicrobitServices } from '../wbx/WbxServices';
import { IoPinService } from 'microbit-web-bluetooth/types/services/io-pin';
import { Services } from 'microbit-web-bluetooth';

interface Props extends ServiceProps<IoPinService> {
}

export function MicrobitIoPin(props: Props) {
    
    const onServicesBound: BoundCallback<Services> = bound => {
        const target = bound.target.ioPinService;
        if (target) {
            if (props.onServiceBound) {
                props.onServiceBound({ ...bound, target});
            }
        }
    };

    return (
        <MicrobitServices onServicesBound={onServicesBound} />
    );
}
