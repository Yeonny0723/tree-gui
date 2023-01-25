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
const validateCommand:IValidateCommand = (command, tree) => {

    let message = ""

    const commandSplitted = command.trim().split(" ")

    const action = commandSplitted[0]
    const extra = commandSplitted.slice(1,)

    switch(action){
        case "add":

            if (!PATTERN.reAddPattern.test(command)){
                message = ERR_MSG.invalidCommandFormat
                return message 
            } 

            var [_fileType, _newFile] = extra;

            if (findFile(_newFile,tree)){
                message = ERR_MSG.fileAlrdExists
                return message

            } else {
                const _message = confirmFn(CONFIRM_MSG.confirmRecurringAdd);
                if (_message) return _message
            }

            if(checkFileType(_newFile, tree)===STATE_PROP.FILE){
                message = ERR_MSG.addFileInFile
                return message
            }

            return message

        case "delete":
            
            if (!PATTERN.reDeletePattern.test(command)){
                message = ERR_MSG.invalidCommandFormat
                return message
            }
            
            var [_filePath] = extra;
            if (!findFile(_filePath,tree)){
                message = ERR_MSG.fileDoesNotExist
                return message

            } else {
                const _message = confirmFn(CONFIRM_MSG.confirmRecurringDelete);
                if (_message) return _message
            }

            return message

        case "link":

            if (!PATTERN.reLinkPattern.test(command)){
                message = ERR_MSG.invalidCommandFormat
                return message
            }

            var [_referred, _referring] = extra; 
            if (!findFile(_referred, tree) || !findFile(_referring.slice(0,-2), tree)){
                message = ERR_MSG.fileDoesNotExist
                return message
            }
            return message
            
        case "move":

            if (!PATTERN.reMovePattern.test(command)){
                message = ERR_MSG.invalidCommandFormat
                return message
            }

            var [_pathFrom, _pathTo] = extra;
            if (!findFile(_pathFrom, tree) || !findFile(_pathTo, tree)){
                message = ERR_MSG.fileDoesNotExist
                return message
            }
            return message

        case "change":
            
            if (!PATTERN.reChangePattern.test(command)){
                message = ERR_MSG.invalidCommandFormat
                return message
            }
            
            var [_filePath, hide] = extra;
            if (!findFile(_filePath,tree)){
                message = ERR_MSG.fileDoesNotExist
                return message
                
            }   else {
                const _message = confirmFn(CONFIRM_MSG.confirmRecurringChange);
                if (_message) return _message
            }

            return message
            
        default:
            message = ERR_MSG.nonExistingCommand
            return message
    }
}

export default validateCommand;


const confirmFn: IConfirmFn = (confirmMessage) => {

    const response= window.confirm(confirmMessage)
    if (!response){
        const _message = ERR_MSG.canceled
        return _message
    }
    return 
}