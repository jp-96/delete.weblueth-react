import React, { useEffect, useState } from 'react';
import { CustomEventCallback, ServiceProps } from '../wbx/WbxContext';
import { BoundCallback } from '../wb/WbContext';
import { MicrobitServices } from '../wbx/WbxServices';
import { UartService } from 'microbit-web-bluetooth/types/services/uart';
import { Services } from 'microbit-web-bluetooth';

interface Props extends ServiceProps<UartService> {
}

export function MicrobitUart(props: Props) {
    
    const onServicesBound: BoundCallback<Services> = bound => {
        const target = bound.target.uartService;
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
