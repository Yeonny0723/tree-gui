import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../../store/store';

// Typed된 useDispatch, useSelector 훅 사용
export const useTreeDispatch: () => AppDispatch = useDispatch;
export const useTreeSelector: TypedUseSelectorHook<RootState> = useSelector;
