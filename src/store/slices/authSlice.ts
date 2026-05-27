import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '@/types';

// প্রাথমিক স্টেট ডিফাইন করা
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // লগইন সফল হলে স্টেট আপডেট করার অ্যাকশন
    loginSuccess: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.isLoading = false;
    },
    // লগআউট করলে স্টেট রিসেট করার অ্যাকশন
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

// অ্যাকশনগুলো এক্সপোর্ট করা যাতে কম্পোনেন্ট থেকে কল করা যায়
export const { loginSuccess, logout, setLoading } = authSlice.actions;

// রিডিউসার এক্সপোর্ট করা যা স্টোরে যাবে
export default authSlice.reducer;