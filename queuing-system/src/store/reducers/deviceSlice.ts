import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    collection,
    doc,
    getDoc,
    getDocs,
    updateDoc,
    setDoc,
} from "firebase/firestore";
import { db } from "../../config/firebase";
import { deviceType, Ifilter, defaultState } from "../types/device";
import { RootState } from "..";
import { addDevice, getAll, get, update } from "../actions/deviceActions";

const initialState: defaultState = {
    loading: false,
    device: null,
    devices: [],
    message: {
        fail: false,
        text: "",
    },
};

const deviceSlice = createSlice({
    name: "device",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(addDevice.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(addDevice.fulfilled, (state, action) => {
            if (action.payload.exists()) {
                state.message.fail = false;
                state.message.text = "Thêm thành công";
            } else {
                state.message.fail = true;
                state.message.text = "Đã xảy ra lỗi !";
            }
            state.loading = false;
        });
        builder.addCase(addDevice.rejected, (state, action) => {
            state.message.fail = true;
            state.message.text = action.error.message;
            state.loading = false;
        });

        builder.addCase(getAll.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(getAll.fulfilled, (state, action) => {
            if (action.payload) {
                state.devices = action.payload;
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
                state.device = action.payload;
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

const deviceReducer = deviceSlice.reducer;

export const deviceSelector = (state: RootState) => state.deviceReducer;

// export const {} = deviceSlice.actions;

export default deviceReducer;