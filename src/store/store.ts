import { configureStore } from "@reduxjs/toolkit";

export const makeStore = () => {
  return configureStore({
    reducer: {
      // এখানে ভবিষ্যতে আপনার slices (যেমন: auth, cart) যুক্ত হবে
    },
  });
};

// TypeScript-এর জন্য টাইপ এক্সপোর্ট
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
