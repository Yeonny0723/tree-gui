// command pattern
const reAddPattern = /add\s(directory|file)\s(\/[/a-zA-Z0-9]+)/
const reDeletePattern = /delete\s(\/[/a-zA-Z0-9]+)/
const reLinkPattern = /link\s(\/[/a-zA-Z0-9]+)\s(\/[/a-zA-Z0-9]+)/
const reMovePattern = /move\s(\/[/a-zA-Z0-9]+)\s(\/[/a-zA-Z0-9]+)/
const reChangePattern = /change\s(\/[/a-zA-Z0-9]+)\s(hide|unhide)/

export const PATTERN = {
    reAddPattern, 
    reDeletePattern, 
    reLinkPattern,
    reMovePattern,
    reChangePattern
}

// Error message
const nonExistingCommand = "존재하지 않는 커맨드입니다"
const invalidCommandFormat = "커맨드 형식이 옳지 않습니다"
const fileDoesNotExist = "유효하지않은 파일 또는 폴더 주소입니다"
const fileAlrdExists = "이미 존재하는 파일 또는 폴더명입니다"
const addFileInFile = "파일 내 파일 또는 폴더를 추가할 수 없습니다"
const canceled = "취소하였습니다"

export const ERR_MSG = {
    nonExistingCommand,
    invalidCommandFormat,
    fileDoesNotExist,
    fileAlrdExists,
    addFileInFile,
    canceled
}

// confirmation message
const confirmRecurringAdd = "존재하지 않는 위치에 추가하려는 경우 이전 위치에 파일/폴더가 추가됩니다. 계속하시겠습니까?"
const confirmRecurringChange = "변경하려는 파일 내부 파일/폴더가 같이 변경됩니다. 계속하시겠습니까?"
const confirmRecurringDelete = "하위 파일/폴더가 모두 삭제됩니다. 계속하시겠습니까?"

export const CONFIRM_MSG = {
    confirmRecurringAdd,
    confirmRecurringChange,
    confirmRecurringDelete,
}

// state property
const FILE = "file"
const DIRECTORY = "directory"
const HIDE = true
const UNHIDE = false

export const STATE_PROP = {
    FILE,
    DIRECTORY,
    HIDE,
    UNHIDE,
}