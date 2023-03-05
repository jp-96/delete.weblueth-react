import React, { useEffect, useState } from 'react';
import { CustomEventCallback, ServiceProps } from '../wbx/WbxContext';
import { BoundCallback } from '../wb/WbContext';
import { MicrobitServices } from '../wbx/WbxServices';
import { LedService } from 'microbit-web-bluetooth/types/services/led';
import { Services } from 'microbit-web-bluetooth';

interface Props extends ServiceProps<LedService> {
}

export function MicrobitLed(props: Props) {
    
    const onServicesBound: BoundCallback<Services> = bound => {
        const target = bound.target.ledService;
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
