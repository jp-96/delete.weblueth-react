import React, { useEffect, useState } from 'react';
import { CustomEventCallback, ServiceProps } from '../wbx/WbxContext';
import { BoundCallback } from '../wb/WbContext';
import { MicrobitServices } from '../wbx/WbxServices';
import { DeviceInformationService } from 'microbit-web-bluetooth/types/services/device-information';
import { Services } from 'microbit-web-bluetooth';

interface Props extends ServiceProps<DeviceInformationService> {
}

export function MicrobitDeviceInformation(props: Props) {
    
    const onServicesBound: BoundCallback<Services> = bound => {
        const target = bound.target.deviceInformationService;
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
