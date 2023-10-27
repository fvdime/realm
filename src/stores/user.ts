import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
// import { getToken } from '@/lib/token';

const initialState = {
    user: {
        username: '',
        photoUrl: '',
    },
};

export const fetchUser = createAsyncThunk(
    'user/fetchUser',
    async (token: string) => {
        if (!token) return {};
        const res = await axios.get(
            process.env.NEXT_PUBLIC_API_BASE + '/api/users/getbytoken',
            {
                headers: { authorization: 'Bearer ' + token },
            }
        );
        if (res?.data?.success) return res.data?.data;
        return {};
    }
);

export const { reducer, actions } = createSlice({
    name: 'user',
    initialState,
    reducers: {
        SetUser: (state, action) => {
            state.user = {
                ...state.user,
                ...action.payload,
            };
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUser.fulfilled, (state, action) => {
            state.user = action.payload;
        });
    },
});
