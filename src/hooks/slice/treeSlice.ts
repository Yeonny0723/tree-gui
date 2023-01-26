import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store/store';
import { recursiveAddFile, deleteFile, recursiveLink, move, recursiveChange } from '../../utils/mutateTree';
import { filterCommand } from '../../utils/checkCommand';
import { STATE_PROP as S } from '../../utils/constants';

export const initialState = {
   '/': {
      type: S.DIRECTORY,
      hide: S.UNHIDE,
      link: '',
      next: {},
   },
};

// export const initialState = { // 테스팅용 변수
//   "/": {
//     type: S.DIRECTORY,
//     hide: S.UNHIDE,
//     link: "",
//     next: {
//       type: S.DIRECTORY,
//       hide: S.UNHIDE,
//       link: "",
//       "2":{
//         type: S.DIRECTORY,
//         hide: S.UNHIDE,
//         link: "",
//         next: {
//           "4": {
//             type: S.FILE,
//             hide: S.UNHIDE,
//             link: "",
//             next: {}
//           },
//           "6": {
//             type: S.FILE,
//             hide: S.HIDE,
//             link: "",
//             next: {}
//           }
//       }
//       },
//       "7": {
//       type: S.DIRECTORY,
//       hide: S.UNHIDE,
//       link: "",
//       next:{}
//         }
//   }
//   }
// }

export const treeSlice = createSlice({
   name: 'tree',
   initialState,
   reducers: {
      addTree: (state, action: PayloadAction<string>) => {
         const [_fileType, _filePath] = filterCommand(action.payload);
         recursiveAddFile(state, _fileType, _filePath);
         return state;
      },
      deleteTree: (state, action: PayloadAction<string>) => {
         const [_filePath] = filterCommand(action.payload);
         deleteFile(state, _filePath);
         return state;
      },
      linkTree: (state, action: PayloadAction<string>) => {
         const [_referred, _referring] = filterCommand(action.payload);

         recursiveLink(state, _referred, _referring);
         return state;
      },
      moveTree: (state, action: PayloadAction<string>) => {
         const [_pathFrom, _pathTo] = filterCommand(action.payload);
         move(state, _pathFrom, _pathTo);
         return state;
      },
      changeTree: (state, action: PayloadAction<string>) => {
         const [_filePath, _hide] = filterCommand(action.payload);
         recursiveChange(state, _filePath, _hide);
         return state;
      },
   },
});

export const actions = treeSlice.actions;

export const getTree = (state: RootState) => state;

export default treeSlice.reducer;
