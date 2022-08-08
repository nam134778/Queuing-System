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

export const addDevice = createAsyncThunk(
    "device/add",
    async (values: deviceType) => {
        const newDoc = doc(collection(db, "devices"));
        await setDoc(newDoc, values);
        const Ref = doc(db, "device", newDoc.id);
        const Snap = await getDoc(Ref);
        return Snap;
    }
);

export const getAll = createAsyncThunk(
    "device/getAll",
    async (filter?: Ifilter) => {
        let devices: deviceType[] = [];

        const query = await getDocs(collection(db, "devices"));
        query.forEach((value) => {
            devices.push({
                id: value.id,
                ...(value.data() as deviceType),
            });
        });
        if (filter) {
            if (filter.active != null)
                devices = devices.filter(
                    (device) => device.isActive == filter.active
                );
            if (filter.connect != null)
                devices = devices.filter(
                    (device) => device.isConnect == filter.connect
                );
            if (filter.keywords != "")
                devices = devices.filter(
                    (device) =>
                        device.code
                            .toLowerCase()
                            .includes(filter.keywords.toLowerCase()) ||
                        device.name
                            .toLowerCase()
                            .includes(filter.keywords.toLowerCase()) ||
                        device.ip
                            .toLowerCase()
                            .includes(filter.keywords.toLowerCase())
                );
        }
        devices.reverse();
        return devices;
    }
);

export const get = createAsyncThunk("device/get", async (id: string) => {
    let device: deviceType;

    const deviceRef = doc(db, "devices", id);
    const deviceSnap = await getDoc(deviceRef);
    device = {
        id,
        ...(deviceSnap.data() as deviceType),
    };
    return device;
});

export const update = createAsyncThunk(
    "device/update",
    async ({ id, ...value }: deviceType) => {
        const ref = doc(db, "devices", id as string);
        await updateDoc(ref, { ...value });
    }
);