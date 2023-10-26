import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    user: {
        username: '',
    },
    images: [],
};

export const fetchProfile = createAsyncThunk(
    'profile/fetchProfile',
    async (username: string) => {
        const res = await axios.get(
            process.env.NEXT_PUBLIC_API_BASE + '/api/users/' + username
        );
        if (res?.data?.success) {
            const user = res.data?.user;
            const images = user?.Images;
            user.Images = undefined;
            return {
                user,
                images,
            };
        }
        return {
            user: {},
            images: [],
        };
    }
);

export const { reducer, actions } = createSlice({
    name: 'profile',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchProfile.fulfilled, (state, action) => {
            state.user = action.payload.user;
            state.images = action.payload.images;
        });
    },
});
