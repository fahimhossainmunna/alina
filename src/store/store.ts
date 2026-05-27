import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@/store/slices/authSlice'; // ◄ নতুন স্লাইসটি ইমপোর্ট করা হলো

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer, // ◄ খালি অবজেক্টের ভেতর রিডিউসার বসানো হলো
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];