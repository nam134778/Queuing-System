export type deviceType = {
    id?: string;
    code: string;
    name: string;
    username: string;
    password: string;
    type: string;
    ip: string;
    isActive: boolean;
    isConnect: boolean;
    services: string[];
};

export interface Ifilter {
    active: boolean | null;
    connect: boolean | null;
    keywords: string;
}

export interface defaultState {
    loading: boolean;
    device: deviceType | null;
    devices: deviceType[];
    message: {
        fail: boolean;
        text: string | undefined;
    };
}