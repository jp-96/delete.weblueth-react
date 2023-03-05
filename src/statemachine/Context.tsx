export type CustomServices = Object;

export type RequestDevice = (bluetooth: Bluetooth) => Promise<BluetoothDevice | undefined>;
export type GetServices = (device: BluetoothDevice) => Promise<CustomServices>;
export type GattServerDisconnectedCallback = () => void;

const defalutGattServerDisconnectedCallback: GattServerDisconnectedCallback = () => {
    console.log("missing GattServerDisconnectedCallback.");
};

type Bound<T> = { target: T, binding: boolean };
export type BoundCallback<T> = (bound: Bound<T>) => void;

export class Connection {

    constructor(getServices: GetServices, requestDevice: RequestDevice, bluetooth: Bluetooth = window.navigator.bluetooth, name: string = "micro:bit") {
        this.name = name;
        this.bluetooth = bluetooth;
        this.asyncRequestDevice = requestDevice;
        this.asyncGetServices = getServices;
    }

    public name: string;
    private bluetooth: Bluetooth;
    private asyncRequestDevice: RequestDevice;
    private asyncGetServices: GetServices;

    private gattServerDisconnectedEventCallback: GattServerDisconnectedCallback = defalutGattServerDisconnectedCallback;

    private deviceCallbacks: BoundCallback<BluetoothDevice>[] = [];
    private device?: BluetoothDevice;

    private servicesCallbacks: BoundCallback<CustomServices>[] = [];
    private services?: CustomServices;

    public setGattServerDisconnectedCallback(cb?: GattServerDisconnectedCallback) {
        this.gattServerDisconnectedEventCallback = cb ?? defalutGattServerDisconnectedCallback;
    }

    public async requestDevice() {
        const device = await this.asyncRequestDevice(this.bluetooth);
        this.setDevice(device);
    }

    public resetDevice() {
        this.setServices(undefined);
        this.setDevice(undefined);
    }

    public async getServices() {
        const services = await this.asyncGetServices(this.device!);
        this.setServices(services);
    }

    public resetServices() {
        this.setServices(undefined);
    }

    public disconnectGattServer() {
        if (this.device && this.device.gatt /*&& this.device.gatt.connected*/) {
            if (!this.device.gatt.connected) {
                console.log("Gatt Server has already been disconnected.")
            }
            this.device.gatt.disconnect();
        } else {
            console.log("missing Gatt Server connection.")
        }
    }

    public addDeviceBoundCallback(cb: BoundCallback<BluetoothDevice>) {
        this.deviceCallbacks.push(cb);
        if (this.device) {
            cb({ target: this.device, binding: true }); // bind
        }
    }

    public removeDeviceBoundCallback(cb: BoundCallback<BluetoothDevice>) {
        this.deviceCallbacks = this.deviceCallbacks.filter(f => {
            if (f === cb) {
                if (this.device) {
                    cb({ target: this.device, binding: false }); // unbind
                }
                return false;
            }
            return true;
        });
    }

    private updateDeviceBoundCallbacksAll(binding: boolean): boolean {
        const target = this.device;
        if (target) {
            const bound: Bound<BluetoothDevice> = { target, binding }
            this.deviceCallbacks.forEach(f => f(bound)); // binding
            return true;
        }
        return false;
    }

    private setDevice(device?: BluetoothDevice) {
        const gattserverdisconnected = "gattserverdisconnected";
        this.updateDeviceBoundCallbacksAll(false); // unbind all
        if (this.device) {
            this.device.removeEventListener(gattserverdisconnected, this.gattServerDisconnectedEventCallback);
        }
        this.device = device; // change
        if (this.device) {
            this.device.addEventListener(gattserverdisconnected, this.gattServerDisconnectedEventCallback);
        }
        this.updateDeviceBoundCallbacksAll(true); // bind all
    }

    public addServicesBoundCallback(cb: BoundCallback<CustomServices>) {
        this.servicesCallbacks.push(cb);
        if (this.services) {
            cb({ target: this.services, binding: true }); //bind
        }
    }

    public removeServicesBoundCallback(cb: BoundCallback<CustomServices>) {
        this.servicesCallbacks = this.servicesCallbacks.filter(f => {
            if (f === cb) {
                if (this.services) {
                    f({ target: this.services, binding: false }); // unbind
                }
                return false;
            }
            return true;
        });
    }

    private updateServicesBoundCallbacksAll(binding: boolean) {
        const target = this.services;
        if (target) {
            const bound: Bound<CustomServices> = { target, binding };
            this.servicesCallbacks.forEach(f => f(bound));
        }
        return false;
    }

    private setServices(services?: CustomServices) {
        this.updateServicesBoundCallbacksAll(false); // unbind all
        this.services = services; // change
        this.updateServicesBoundCallbacksAll(true); // bind all
    }

    public purge() {
        this.resetServices();
        this.resetDevice();
        this.setGattServerDisconnectedCallback()
        this.deviceCallbacks = [];
        this.servicesCallbacks = [];
    }

}

type Reason<T> = { type: T, message: string; };

export type RejectedReason = Reason<"NONE" | "ERROR">;
export type DisconnectedReason = Reason<"NONE" | "ERROR" | "DELAYED" | "PERIPHERAL" | "CENTRAL">;

export type Context = {
    conn: Connection;
    rejectedReason: RejectedReason;
    disconnectedReason: DisconnectedReason;
};
