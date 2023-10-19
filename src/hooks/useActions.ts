import { useDispatch } from 'react-redux';
import { useMemo } from 'react';
import { bindActionCreators } from 'redux';
import { themeSlice } from '../store/theme/theme.slice';

const rootActions = {
  ...themeSlice.actions,
};
export default function useActions() {
  const dispatch = useDispatch();
  return useMemo(() => bindActionCreators(rootActions, dispatch), [dispatch]);
}
