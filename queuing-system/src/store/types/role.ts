export type roleType = {
    id?: string;
    name: string;
    description: string;
    amountOfUser?: number;
    authorityA: string[] | undefined;
    authorityB: string[] | undefined;
    authorityC: string[] | undefined;
};

export interface Ifilter {
    keywords: string;
}

export interface defaultState {
    loading: boolean;
    role: roleType | null;
    roles: roleType[];
    message: {
        fail: boolean;
        text: string | undefined;
    };
}
