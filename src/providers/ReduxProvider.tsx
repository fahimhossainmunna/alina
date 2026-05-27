'use client';

import { useRef } from 'react';
import { Provider } from 'react-redux'; // ◄ অফিশিয়াল সাধারণ ইম্পোর্ট
import { makeStore, AppStore } from '@/store/store'; // ◄ সঠিক স্ল্যাশ পাথ

export default function ReduxProvider({ children }: { children: React.ReactNode }) {
  const storeRef = useRef<AppStore | null>(null);
  
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}