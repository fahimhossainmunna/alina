import { useDispatch, useSelector, useStore } from 'react-redux'; // ◄ অফিশিয়াল সাধারণ ইম্পোর্ট
import type { AppDispatch, AppStore, RootState } from '@/store/store'; // ◄ সঠিক স্ল্যাশ পাথ

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector = <T>(selector: (state: RootState) => T) => useSelector(selector);
export const useAppStore = () => useStore<AppStore>();
