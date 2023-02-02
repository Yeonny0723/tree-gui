import { findFile, checkFileType } from '../utils/mutateTree';
import { IValidateCommand, IConfirmFn } from './checkCommand.types';
import { PATTERN, ERR_MSG, STATE_PROP, CONFIRM_MSG } from './constants';

/**
 * 입력 커맨드 유효성 점검 함수 (1) 커맨드 패턴 일치, (2) 존재하는 파일에 대한 명령인지
 * @param {string} command 입력한 커맨드
 * @param {any} tree 파일 트리
 * @returns
 */

// TODO: 리팩도링
const validateCommand: IValidateCommand = (command, tree) => {
   let message = '';

   const commandSplitted = command.trim().split(' ');

   const action = commandSplitted[0];
   const extra = commandSplitted.slice(1);

   switch (action) {
      case 'add': {
         if (!PATTERN.reAddPattern.test(command)) {
            // 패턴 체크
            const _message = ERR_MSG.invalidCommandFormat;
            return _message;
         }
         const [_fileType, _newFile] = extra; // 파일 존재 여부 체크
         if (findFile(_newFile, tree)) {
            const _message = ERR_MSG.fileAlrdExists;
            return _message;
         } else {
            // 파일 연쇄 생성 컨펌
            const _message = confirmFn(CONFIRM_MSG.confirmRecurringAdd);
            if (_message) return _message;
         }
         if (checkFileType(_newFile, tree) === STATE_PROP.FILE) {
            // 파일노드 내 파일,폴더 추가 불가 체크
            message = ERR_MSG.addFileInFile;
            return message;
         }
         return message;
      }
      case 'delete': {
         if (!PATTERN.reDeletePattern.test(command)) {
            // 패턴 체크
            message = ERR_MSG.invalidCommandFormat;
            return message;
         }
         const [_filePath] = extra;
         if (!findFile(_filePath, tree)) {
            // 파일 존재 여부 체크
            message = ERR_MSG.fileDoesNotExist;
            return message;
         } else {
            // 파일 연쇄 삭제 컨펌
            const _message = confirmFn(CONFIRM_MSG.confirmRecurringDelete);
            if (_message) return _message;
         }
         return message;
      }
      case 'link': {
         if (!PATTERN.reLinkPattern.test(command)) {
            // 패턴 체크
            message = ERR_MSG.invalidCommandFormat;
            return message;
         }
         const [_referred, _referring] = extra; // 파일 존재 여부 체크
         if (!findFile(_referred, tree)) {
            message = ERR_MSG.fileDoesNotExist;
            return message;
         }
         return message;
      }
      case 'move': {
         if (!PATTERN.reMovePattern.test(command)) {
            // 패턴 체크
            message = ERR_MSG.invalidCommandFormat;
            return message;
         }
         const [_pathFrom, _pathTo] = extra;
         if (!findFile(_pathFrom, tree) || !findFile(_pathTo, tree)) {
            // 파일 존재 여부 체크
            message = ERR_MSG.fileDoesNotExist;
            return message;
         }
         return message;
      }
      case 'change': {
         if (!PATTERN.reChangePattern.test(command)) {
            // 패턴 체크
            message = ERR_MSG.invalidCommandFormat;
            return message;
         }
         const [_filePath, hide] = extra; // 파일 존재 여부 체크
         if (!findFile(_filePath, tree)) {
            message = ERR_MSG.fileDoesNotExist;
            return message;
         } else {
            // 파일 연쇄 업데이트 컨펌
            const _message = confirmFn(CONFIRM_MSG.confirmRecurringChange);
            if (_message) return _message;
         }
         return message;
      }
      default:
         message = ERR_MSG.nonExistingCommand;
         return message;
   }
};

// action 제외 command를 필터 후 반환해주는 함수
// eg "add file /a" -> ["file", "/a"]
export const filterCommand = (payload: string) => {
   return payload.split(' ').slice(1);
};

// confirm 메시지 팝업 함수
export const confirmFn: IConfirmFn = confirmMessage => {
   const response = window.confirm(confirmMessage);
   if (!response) {
      const _message = ERR_MSG.canceled;
      return _message;
   }
   return;
};

export default validateCommand;
