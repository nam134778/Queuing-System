import { Moment } from "moment";
import {
    Timestamp,
} from "firebase/firestore";

export type serviceType = {
    id?: string;
    code: string;
    name: string;
    description: string;
    isAuto: boolean;
    isPrefix: boolean;
    isSurfix: boolean;
    increaseStart?: number;
    increaseEnd?: number;
    prefix?: string;
    surfix?: string;
    reset: boolean;
    isActive?: boolean;
    timeGet: Timestamp;
};

export interface Ifilter {
    active: boolean | null;
    keywords: string;
    dateRange: [Moment, Moment] | null;
}

export interface defaultState {
    loading: boolean;
    service: serviceType | null;
    services: serviceType[];
    message: {
        fail: boolean;
        text: string | undefined;
    };
}