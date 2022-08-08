import {
    Timestamp,
} from "firebase/firestore";
import moment, { Moment } from "moment";

export type diaryType = {
    id?: string;
    username: string;
    ip: string;
    action: string;
    time: Timestamp;
};

export interface Ifilter {
    keywords: string;
    dateRange: [Moment, Moment] | null;
}

export interface defaultState {
    loading: boolean;
    diaries: diaryType[];
    message: {
        fail: boolean;
        text: string | undefined;
    };
}