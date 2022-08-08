export type userType = {
    id?: string;
    username: string;
    password: string;
    email: string;
    phoneNumber: string;
    role: string;
    name: string;
    isActive: boolean;
};

export interface Ifilter {
    active: boolean | null;
    keywords: string;
}

export interface defaultState {
    authLoading: boolean;
    userId: string;
    userLogin: userType | null;
    user: userType | null;
    users: userType[];
    message: {
        fail: boolean;
        text: string | undefined;
    };
}

export interface changePassword {
    id: string;
    password: string;
}