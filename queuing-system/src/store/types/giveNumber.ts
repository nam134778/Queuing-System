import {
    Timestamp,
} from "firebase/firestore";
import moment, { Moment } from "moment";

export type giveNumberType = {
    id?: string;
    service: string;
    number?: string;
    name: string;
    stt: number;
    status: string;
    src: string;
    timeGet: Timestamp;
    timeExp: Timestamp;
    phoneNumber: string;
    email: string;
};

export interface Ifilter {
    status?: string | null;
    service?: string;
    src?: string;
    keywords: string;
    dateRange: [Moment, Moment] | null;
}

export interface defaultState {
    loading: boolean;
    giveNumber: giveNumberType | null;
    giveNumbers: giveNumberType[];
    giveNumbersFilter: giveNumberType[];
    message: {
        fail: boolean;
        text: string | undefined;
    };
}
