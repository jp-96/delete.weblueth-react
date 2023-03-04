import { CustomEventCallback, DeviceEffector, MicrobitContextProvider, ServicesEffector, useMicrobitActor } from './context/MicrobitContext';
import { BoundCallback } from './statemachine/Context';

import { MicrobitDevice } from './context/MicroBitDevice';
import { MicrobitServices } from './context/MicroBitServices';

import { MicrobitAccelerometer } from './services/MicrobitAccelerometer';
import { MicrobitButton } from './services/MicrobitButton';
import { MicrobitDeviceInformation } from './services/MicrobitDeviceInformation';
import { MicrobitDfuControl } from './services/MicrobitDfuControl';
import { MicrobitEvent } from './services/MicrobitEvent';
import { MicrobitIoPin } from './services/MicrobitIoPin';
import { MicrobitLed } from './services/MicrobitLed';
import { MicrobitMagnetometer } from './services/MicrobitMagnetometer';
import { MicrobitTemperature } from './services/MicrobitTemperature';
import { MicrobitUart } from './services/MicrobitUart';

export {
    CustomEventCallback, DeviceEffector, ServicesEffector, useMicrobitActor,
    BoundCallback,

    MicrobitDevice,
    MicrobitServices,

    MicrobitAccelerometer,
    MicrobitButton,
    MicrobitDeviceInformation,
    MicrobitDfuControl,
    MicrobitEvent,
    MicrobitIoPin,
    MicrobitLed,
    MicrobitMagnetometer,
    MicrobitTemperature,
    MicrobitUart
}
export default MicrobitContextProvider;


// export { CustomEventCallback, DeviceEffector, ServicesEffector, useMicrobitActor } from './context/MicrobitContext';
// export { BoundCallback } from './statemachine/Context';

// export { MicrobitDevice } from './context/MicroBitDevice';
// export { MicrobitServices } from './context/MicroBitServices';

// export { MicrobitAccelerometer } from './services/MicrobitAccelerometer';
// export { MicrobitButton } from './services/MicrobitButton';
// export { MicrobitDeviceInformation } from './services/MicrobitDeviceInformation';
// export { MicrobitDfuControl } from './services/MicrobitDfuControl';
// export { MicrobitEvent } from './services/MicrobitEvent';
// export { MicrobitIoPin } from './services/MicrobitIoPin';
// export { MicrobitLed } from './services/MicrobitLed';
// export { MicrobitMagnetometer } from './services/MicrobitMagnetometer';
// export { MicrobitTemperature } from './services/MicrobitTemperature';
// export { MicrobitUart } from './services/MicrobitUart';
