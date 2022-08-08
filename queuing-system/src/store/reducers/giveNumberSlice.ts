import moment, { Moment } from "moment";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    collection,
    doc,
    getDoc,
    getDocs,
    updateDoc,
    setDoc,
    Timestamp,
    query,
    where,
} from "firebase/firestore";
import { db } from "../../config/firebase";
import { serviceType } from "../types/service";
import { RootState } from "../index";
import { Console } from "console";
import { giveNumberType, Ifilter, defaultState } from "../types/giveNumber";


export const addgiveNumber = createAsyncThunk(
    "giveNumber/add",
    async (values: giveNumberType) => {
        let giveNumbers: giveNumberType[] = [];
        let giveNumbers2: giveNumberType[] = [];
        const query2 = await getDocs(collection(db, "giveNumber"));
        query2.forEach((value) => {
            giveNumbers2.push({
                id: value.id,
                ...(value.data() as giveNumberType),
            });
        });
        const querySnapshot = await getDocs(
            query(
                collection(db, "giveNumber"),
                where("service", "==", values.service)
            )
        );
        querySnapshot.forEach((value) => {
            giveNumbers.push({
                id: value.id,
                ...(value.data() as giveNumberType),
            });
        });
        giveNumbers.sort(
            (a, b) =>
                b.timeGet.toDate().getTime() - a.timeGet.toDate().getTime()
        );

        const newDoc = doc(collection(db, "giveNumber"));
        await setDoc(newDoc, {
            ...values,
            stt: giveNumbers.length > 0 ? giveNumbers2.length + 1 : 1,
        });

        const Ref = doc(db, "giveNumber", newDoc.id);
        const Snap = await getDoc(Ref);
        return Snap.id;
    }
);

export const getAll = createAsyncThunk(
    "giveNumber/getAll",
    async (filter?: Ifilter) => {
        let giveNumbers: giveNumberType[] = [];
        const query = await getDocs(collection(db, "giveNumber"));
        query.forEach((value) => {
            giveNumbers.push({
                id: value.id,
                ...(value.data() as giveNumberType),
            });
        });
        if (filter) {
            giveNumbers = giveNumbers.filter((giveNumber) => {
                if (
                    filter.status &&
                    filter.status != null &&
                    giveNumber.status !== filter.status
                )
                    return false;
                if (
                    filter.src &&
                    filter.src != "" &&
                    giveNumber.src !== filter.src
                )
                    return false;
                if (
                    filter.service &&
                    filter.service != "" &&
                    giveNumber.service !== filter.service
                )
                    return false;
                if (filter.dateRange && filter.dateRange != null) {
                    const dateProvider = moment(
                        giveNumber.timeGet.toDate()
                    );
                    if (
                        filter.dateRange[0] &&
                        !moment(filter.dateRange[0]).isSameOrBefore(
                            dateProvider,
                            "days"
                        )
                    ) {
                        return false;
                    }

                    if (
                        filter.dateRange[1] &&
                        !moment(filter.dateRange[1]).isSameOrAfter(
                            dateProvider,
                            "days"
                        )
                    ) {
                        return false;
                    }
                }
                return true;
            });
        }
        for (const giveNumber of giveNumbers) {
            const Snap = await getDoc(
                doc(db, "services", giveNumber.service as string)
            );
            const temp = Snap.data() as serviceType;
            giveNumber.service = temp.name;
            var str = "" + giveNumber.stt
            var pad = "0000"
            if (temp.prefix) giveNumber.number = temp.prefix + pad.substring(0, pad.length - str.length) +  giveNumber.stt;
            else giveNumber.number = giveNumber.stt.toString();
        }
        if (filter) {
            if (filter.keywords != "") {
                giveNumbers = giveNumbers.filter(
                    (giveNumber) =>
                        giveNumber.name
                            .toLowerCase()
                            .includes(filter.keywords.toLowerCase()) ||
                        giveNumber.number
                            ?.toLowerCase()
                            .includes(filter.keywords.toLowerCase()) ||
                        giveNumber.service
                            ?.toLowerCase()
                            .includes(filter.keywords.toLowerCase()) ||
                            giveNumber.src
                            ?.toLowerCase()
                            .includes(filter.keywords.toLowerCase())
                );
            }
        }
        giveNumbers.sort(
            (a, b) =>
                b.timeGet.toDate().getTime() - a.timeGet.toDate().getTime()
        );
        return giveNumbers;
    }
);

export const getByIdService = createAsyncThunk(
    "giveNumber/getByIdService",
    async ({ id, filter }: { id: string; filter?: Ifilter }) => {
        let giveNumbers: giveNumberType[] = [];

        const querySnapshot = await getDocs(
            query(collection(db, "giveNumber"), where("service", "==", id))
        );
        querySnapshot.forEach((value) => {
            giveNumbers.push({
                id: value.id,
                ...(value.data() as giveNumberType),
            });
        });
        if (filter) {
            giveNumbers = giveNumbers.filter((giveNumber) => {
                if (
                    filter.status &&
                    filter.status != null &&
                    giveNumber.status !== filter.status
                )
                    return false;
                if (
                    filter.src &&
                    filter.src != "" &&
                    giveNumber.src !== filter.src
                )
                    return false;
                if (
                    filter.service &&
                    filter.service != "" &&
                    giveNumber.service !== filter.service
                )
                    return false;
                if (filter.dateRange && filter.dateRange != null) {
                    const dateProvider = moment(
                        giveNumber.timeGet.toDate()
                    );
                    if (
                        filter.dateRange[0] &&
                        !moment(filter.dateRange[0]).isSameOrBefore(
                            dateProvider,
                            "days"
                        )
                    ) {
                        return false;
                    }

                    if (
                        filter.dateRange[1] &&
                        !moment(filter.dateRange[1]).isSameOrAfter(
                            dateProvider,
                            "days"
                        )
                    ) {
                        return false;
                    }
                }
                return true;
            });
        }
        for (const giveNumber of giveNumbers) {
            const Snap = await getDoc(
                doc(db, "services", giveNumber.service as string)
            );
            const temp = Snap.data() as serviceType;
            var str = "" + giveNumber.stt
            var pad = "0000"
            if (temp.prefix) giveNumber.number = temp.prefix + pad.substring(0, pad.length - str.length) +  giveNumber.stt;
            else giveNumber.number = giveNumber.stt.toString();
        }
        if (filter) {
            if (filter.status != null)
                giveNumbers = giveNumbers.filter(
                    (giveNumber) => giveNumber.status == filter.status
                );
            if (filter.keywords != "")
                giveNumbers = giveNumbers.filter((giveNumber) =>
                    giveNumber.number
                        ?.toLowerCase()
                        .includes(filter.keywords.toLowerCase())
                );
        }
        giveNumbers.sort(
            (a, b) =>
                b.timeGet.toDate().getTime() - a.timeGet.toDate().getTime()
        );
        return giveNumbers;
    }
);

export const get = createAsyncThunk(
    "giveNumber/get",
    async (id: string) => {
        let giveNumber: giveNumberType;

        const giveNumberRef = doc(db, "giveNumber", id);
        const giveNumberSnap = await getDoc(giveNumberRef);
        giveNumber = {
            id,
            ...(giveNumberSnap.data() as giveNumberType),
        };
        const Snap = await getDoc(
            doc(db, "services", giveNumber.service as string)
        );
        const temp = Snap.data() as serviceType;
        giveNumber.service = temp.name;
        var str = "" + giveNumber.stt
        var pad = "0000"
        if (temp.prefix) giveNumber.number = temp.prefix + pad.substring(0, pad.length - str.length) +  giveNumber.stt;
        else giveNumber.number = giveNumber.stt.toString();
        return giveNumber;
    }
);

export const update = createAsyncThunk(
    "giveNumber/update",
    async ({ id, ...value }: giveNumberType) => {
        const ref = doc(db, "giveNumber", id as string);
        await updateDoc(ref, { ...value });
    }
);

const initialState: defaultState = {
    loading: false,
    giveNumber: null,
    giveNumbers: [],
    giveNumbersFilter: [],
    message: {
        fail: false,
        text: "",
    },
};

const giveNumberSlice = createSlice({
    name: "giveNumber",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(addgiveNumber.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(addgiveNumber.fulfilled, (state, action) => {
            if (action.payload) {
                state.message.fail = false;
                state.message.text = "Thêm thành công";
            } else {
                state.message.fail = true;
                state.message.text = "Đã xảy ra lỗi !";
            }
            state.loading = false;
        });
        builder.addCase(addgiveNumber.rejected, (state, action) => {
            state.message.fail = true;
            state.message.text = action.error.message;
            state.loading = false;
        });

        builder.addCase(getAll.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(getAll.fulfilled, (state, action) => {
            if (action.payload) {
                state.giveNumbers = action.payload;
                state.message.fail = false;
                state.message.text = "";
            } else {
                state.giveNumbers = [];
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

        builder.addCase(getByIdService.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(getByIdService.fulfilled, (state, action) => {
            if (action.payload) {
                state.giveNumbersFilter = action.payload;
                state.message.fail = false;
                state.message.text = "";
            } else {
                state.giveNumbersFilter = [];
                state.message.fail = true;
                state.message.text = "Đã xảy ra lỗi !";
            }
            state.loading = false;
        });
        builder.addCase(getByIdService.rejected, (state, action) => {
            state.message.fail = true;
            state.message.text = action.error.message;
            state.loading = false;
        });

        builder.addCase(get.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(get.fulfilled, (state, action) => {
            if (action.payload) {
                state.giveNumber = action.payload;
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

const giveNumberReducer = giveNumberSlice.reducer;

export const giveNumberSelector = (state: RootState) =>
    state.giveNumberReducer;

export const {} = giveNumberSlice.actions;

export default giveNumberReducer;