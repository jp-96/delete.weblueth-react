import React, { EffectCallback } from 'react';
import { State } from 'xstate'; // yarn add --dev xstate
import { createActorContext } from '@xstate/react'; // yarn add --dev @xstate/react
import { createContext, machineWithoutContext } from '../wb/WbMachine';
import { Connection, Context, WbBoundCallback, GetServices, RequestDevice, WbServices } from '../wb/WbContext';

const WbxActorContext = createActorContext(machineWithoutContext);

export const useWbxActor = () => WbxActorContext.useActor();
export const useWbxActorRef = () => WbxActorContext.useActorRef();

type Props = {
    children: any;
    getServices: GetServices;
    requestDevice: RequestDevice;
    connectionName?: string;
}

export function WbxContextProvider(props: Props) {
    const context = createContext(new Connection(props.getServices, props.requestDevice, window.navigator.bluetooth, props.connectionName));
    return (
        <WbxActorContext.Provider machine={() => machineWithoutContext.withContext(context)}>
            {props.children}
        </WbxActorContext.Provider>
    );
}

// helper

type StateWithContext = State<Context, any, any, any, any>;
type ConnectionContainer = StateWithContext | Context | Connection

export function WbxRefConnection(cc: ConnectionContainer): Connection {
    if ((cc as StateWithContext).context.conn) {
        return (cc as StateWithContext).context.conn;
    }
    if ((cc as Context).conn) {
        return (cc as Context).conn;
    }
    if (cc as Connection) {
        return (cc as Connection);
    }
    return undefined!;
}

export function WbxDeviceEffector(cc: ConnectionContainer, cb: WbBoundCallback<BluetoothDevice>): EffectCallback {
    return () => {
        /**
         * NOTE:
         * When StrictMode is enabled, React intentionally double-invokes
         * effects (mount -> unmount -> mount) for newly mounted components. 
         * https://github.com/reactwg/react-18/discussions/19
         */

        //console.log("DeviceEffector init:", cb)
        const conn = WbxRefConnection(cc);
        conn.addDeviceBoundCallback(cb);
        return () => {
            //console.log("DeviceEffector deinit:", cb)
            conn.removeDeviceBoundCallback(cb);
        };
    }
}

export function WbxServicesEffector(cc: ConnectionContainer, cb: WbBoundCallback<WbServices>): EffectCallback {
    return () => {
        /**
         * NOTE:
         * When StrictMode is enabled, React intentionally double-invokes
         * effects (mount -> unmount -> mount) for newly mounted components. 
         * https://github.com/reactwg/react-18/discussions/19
         */

        //console.log("ServicesEffector init:", cb)
        const conn = WbxRefConnection(cc);
        conn.addServicesBoundCallback(cb);
        return () => {
            //console.log("ServicesEffector deinit:", cb)
            conn.removeServicesBoundCallback(cb);
        };
    }
}

// type, interface

export type WbxCustomEventCallback<T> = (event: CustomEvent<T>) => void;

export interface WbxServiceProps<T> {
    //children?: any;
    onServiceBound?: WbBoundCallback<T>;
}
