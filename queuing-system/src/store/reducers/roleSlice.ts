import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    collection,
    doc,
    getDoc,
    getDocs,
    query,
    updateDoc,
    where,
    setDoc,
} from "firebase/firestore";
import { db } from "../../config/firebase";
import { RootState } from "../index";
import { roleType, Ifilter, defaultState } from "../types/role";

export const addRole = createAsyncThunk(
    "role/add",
    async (values: roleType) => {
        const newRole = doc(collection(db, "role"));
        await setDoc(newRole, values);
        const roleRef = doc(db, "role", newRole.id);
        const roleSnap = await getDoc(roleRef);
        return roleSnap;
    }
);

export const getAll = createAsyncThunk(
    "role/getAll",
    async (filter?: Ifilter) => {
        let roles: roleType[] = [];

        const queryRoles = await getDocs(collection(db, "role"));
        queryRoles.forEach((value) => {
            roles.push({
                id: value.id,
                ...(value.data() as roleType),
            });
        });
        for (const role of roles) {
            const roleSnap = await getDocs(
                query(collection(db, "user"), where("role", "==", role.id))
            );
            let amountOfUser = 0;
            roleSnap.forEach((value) => {
                amountOfUser += 1;
            });
            role.amountOfUser = amountOfUser;
        }
        if (filter) {
            if (filter.keywords != "")
                roles = roles.filter(
                    (role) =>
                        role.name
                            .toLowerCase()
                            .includes(filter.keywords.toLowerCase()) ||
                        role.description
                            .toLowerCase()
                            .includes(filter.keywords.toLowerCase())
                );
        }
        roles.reverse();
        return roles;
    }
);

export const get = createAsyncThunk("role/get", async (id: string) => {
    let role: roleType;

    const roleRef = doc(db, "role", id);
    const roleSnap = await getDoc(roleRef);
    role = {
        id,
        ...(roleSnap.data() as roleType),
    };

    return role;
});

export const update = createAsyncThunk(
    "role/update",
    async (value: roleType) => {
        const roleRef = doc(db, "role", value.id as string);
        await updateDoc(roleRef, value);
    }
);

const initialState: defaultState = {
    loading: false,
    role: null,
    roles: [],
    message: {
        fail: false,
        text: "",
    },
};

const roleSlice = createSlice({
    name: "role",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(addRole.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(addRole.fulfilled, (state, action) => {
            if (action.payload.exists()) {
                state.message.fail = false;
                state.message.text = "Thêm vai trò thành công";
            } else {
                state.message.fail = true;
                state.message.text = "Đã xảy ra lỗi !";
            }
            state.loading = false;
        });
        builder.addCase(addRole.rejected, (state, action) => {
            state.message.fail = true;
            state.message.text = action.error.message;
            state.loading = false;
        });

        builder.addCase(getAll.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(getAll.fulfilled, (state, action) => {
            if (action.payload) {
                state.roles = action.payload;
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
                state.role = action.payload;
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

const roleReducer = roleSlice.reducer;

export const roleSelector = (state: RootState) => state.roleReducer;

export const {} = roleSlice.actions;

export default roleReducer;