import React, { useEffect, useState } from 'react';
import { CustomEventCallback, ServiceProps } from '../wbx/WbxContext';
import { BoundCallback } from '../wb/WbContext';
import { MicrobitServices } from '../wbx/WbxServices';
import { EventService } from 'microbit-web-bluetooth/types/services/event';
import { Services } from 'microbit-web-bluetooth';

interface Props extends ServiceProps<EventService> {
}

export function MicrobitEvent(props: Props) {
    
    const onServicesBound: BoundCallback<Services> = bound => {
        const target = bound.target.eventService;
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
