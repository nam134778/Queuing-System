
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    collection,
    doc,
    getDoc,
    getDocs,
    updateDoc,
    setDoc,
} from "firebase/firestore";
import moment, { Moment } from "moment";
import { db } from "../../config/firebase";
import { serviceType, Ifilter, defaultState } from "../types/service";
import { RootState } from "..";

export const addService = createAsyncThunk(
    "service/add",
    async (values: serviceType) => {
        const newDoc = doc(collection(db, "services"));
        await setDoc(newDoc, values);
        const Ref = doc(db, "service", newDoc.id);
        const Snap = await getDoc(Ref);
        return Snap;
    }
);

export const getAll = createAsyncThunk(
    "service/getAll",
    async (filter?: Ifilter) => {
        let services: serviceType[] = [];

        const query = await getDocs(collection(db, "services"));
        query.forEach((value) => {
            services.push({
                id: value.id,
                ...(value.data() as serviceType),
            });
        });
        if (filter) {
            console.log(filter.dateRange)
            if (filter.active != null)
                services = services.filter(
                    (service) => service.isActive == filter.active
                );
            if (filter.keywords != "")
                services = services.filter(
                    (service) =>
                        service.code
                            .toLowerCase()
                            .includes(filter.keywords.toLowerCase()) ||
                        service.name
                            .toLowerCase()
                            .includes(filter.keywords.toLowerCase()) ||
                        service.description
                            .toLowerCase()
                            .includes(filter.keywords.toLowerCase())
                );
        }
        services.reverse();
        return services;
    }
);

export const get = createAsyncThunk("service/get", async (id: string) => {
    let service: serviceType;

    const serviceRef = doc(db, "services", id);
    const serviceSnap = await getDoc(serviceRef);
    service = {
        id,
        ...(serviceSnap.data() as serviceType),
    };

    return service;
});

export const update = createAsyncThunk(
    "service/update",
    async ({ id, ...value }: serviceType) => {
        const ref = doc(db, "services", id as string);
        await updateDoc(ref, { ...value });
    }
);

const initialState: defaultState = {
    loading: false,
    service: null,
    services: [],
    message: {
        fail: false,
        text: "",
    },
};

const serviceSlice = createSlice({
    name: "service",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(addService.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(addService.fulfilled, (state, action) => {
            if (action.payload.exists()) {
                state.message.fail = false;
                state.message.text = "Thêm thành công";
            } else {
                state.message.fail = true;
                state.message.text = "Đã xảy ra lỗi !";
            }
            state.loading = false;
        });
        builder.addCase(addService.rejected, (state, action) => {
            state.message.fail = true;
            state.message.text = action.error.message;
            state.loading = false;
        });

        builder.addCase(getAll.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(getAll.fulfilled, (state, action) => {
            if (action.payload) {
                state.services = action.payload;
                state.message.fail = false;
                state.message.text = "";
            } else {
                state.message.fail = true;
                state.message.text = "Đã xảy ra lỗi !";
            }
            state.loading = false;
        });
        builder.addCase(getAll.rejected, (state, action) => {
            state.message.fail = true;
            state.message.text = action.error.message;
            state.loading = false;
        });

        builder.addCase(get.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(get.fulfilled, (state, action) => {
            if (action.payload) {
                state.service = action.payload;
                state.message.fail = false;
                state.message.text = "";
            } else {
                state.message.fail = true;
                state.message.text = "Đã xảy ra lỗi !";
            }
            state.loading = false;
        });
        builder.addCase(get.rejected, (state, action) => {
            state.message.fail = true;
            state.message.text = action.error.message;
            state.loading = false;
        });

        builder.addCase(update.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(update.fulfilled, (state, action) => {
            state.message.fail = false;
            state.message.text = "Cập nhật thành công";
            state.loading = false;
        });
        builder.addCase(update.rejected, (state, action) => {
            state.message.fail = true;
            state.message.text = action.error.message;
            state.loading = false;
        });
    },
});

const serviceReducer = serviceSlice.reducer;

export const serviceSelector = (state: RootState) => state.serviceReducer;

export const {} = serviceSlice.actions;

export default serviceReducer;
