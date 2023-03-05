import React, { useEffect, useState } from 'react';
import { CustomEventCallback, ServiceProps } from '../wbx/WbxContext';
import { BoundCallback } from '../wb/WbContext';
import { MicrobitServices } from '../wbx/WbxServices';
import { MagnetometerService } from 'microbit-web-bluetooth/types/services/magnetometer';
import { Services } from 'microbit-web-bluetooth';

interface Props extends ServiceProps<MagnetometerService> {
}

export function MicrobitMagnetometer(props: Props) {
    
    const onServicesBound: BoundCallback<Services> = bound => {
        const target = bound.target.magnetometerService;
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
