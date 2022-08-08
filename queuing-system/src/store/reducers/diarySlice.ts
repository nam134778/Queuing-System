import moment, { Moment } from "moment";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    collection,
    doc,
    getDoc,
    getDocs,
    setDoc,
    Timestamp,
} from "firebase/firestore";
import { db } from "../../config/firebase";
import { RootState } from "../index";
import { diaryType, Ifilter, defaultState } from "../types/diary";

export const add = createAsyncThunk("diary/add", async (values: diaryType) => {
    const newDoc = doc(collection(db, "diary"));
    await setDoc(newDoc, values);
    const ref = doc(db, "roles", newDoc.id);
    const snap = await getDoc(ref);
    return snap;
});

export const getAll = createAsyncThunk(
    "diary/getAll",
    async (filter?: Ifilter) => {
        let diaries: diaryType[] = [];

        const query = await getDocs(collection(db, "diary"));
        query.forEach((value) => {
            diaries.push({
                id: value.id,
                ...(value.data() as diaryType),
            });
            console.log(value.data() as diaryType);
        });

        if (filter) {
            diaries = diaries.filter((diary) => {
                if (filter.dateRange != null) {
                    const dateProvider = moment(diary.time.toDate());
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
            if (filter.keywords != "")
                diaries = diaries.filter(
                    (diary) =>
                        diary.username
                            .toLowerCase()
                            .includes(filter.keywords.toLowerCase()) ||
                        diary.ip
                            .toLowerCase()
                            .includes(filter.keywords.toLowerCase()) ||
                        diary.action
                            .toLowerCase()
                            .includes(filter.keywords.toLowerCase())
                );
        }
        diaries.sort(
            (a, b) => b.time.toDate().getTime() - a.time.toDate().getTime()
        );
        return diaries;
    }
);


const initialState: defaultState = {
    loading: false,
    diaries: [],
    message: {
        fail: false,
        text: "",
    },
};

const diarySlice = createSlice({
    name: "diary",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(add.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(add.fulfilled, (state, action) => {
            if (action.payload.exists()) {
                state.message.fail = false;
                state.message.text = "Lưu lịch sử thành công";
            } else {
                state.message.fail = true;
                state.message.text = "Đã xảy ra lỗi !";
            }
            state.loading = false;
        });
        builder.addCase(add.rejected, (state, action) => {
            state.message.fail = true;
            state.message.text = action.error.message;
            state.loading = false;
        });

        builder.addCase(getAll.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(getAll.fulfilled, (state, action) => {
            if (action.payload) {
                state.diaries = action.payload;
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
    },
});

const diaryReducer = diarySlice.reducer;

export const diarySelector = (state: RootState) => state.diaryReducer;

export const {} = diarySlice.actions;

export default diaryReducer;