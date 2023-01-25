import _ from 'lodash';
import { STATE_PROP as S } from "./constants"
import * as I from "./mutateTree.types"

// recursive 파일 추가
export const recursiveAddFile:I.IRecursiveaddFile = (fileTree, fileType, filePath)=> {
  const filePathLst = filePath.replaceAll("/", "/next/").split("/")
  filePathLst[0] = '/'

  for(let i=1;i<filePathLst.length+1;i++){
    const pathSlice =  filePathLst.slice(0,i)
    const target = _.get(fileTree, pathSlice)
    if(target ===  undefined){  // 내부 {}에 이미 다른 노드 존재하여 target === undefined인 경우
      const newNode = {
        type: i === filePathLst.length-1 ? fileType: S.DIRECTORY,
        hide: S.UNHIDE,
        next: {},
      }
      _.set(fileTree, [...pathSlice], newNode); 
      continue
    }
    if(Object.keys(target).length === 0){  // 노드가 비어있어 target === {} 빈 객체인 경우
      const newNode = {
        type: i === filePathLst.length-1 ? fileType: S.DIRECTORY,
        hide: S.UNHIDE,
        next: {},
      }
      _.set(fileTree, [...pathSlice, filePathLst[i]], newNode); 
      continue
    }
  }
}

// 마지막 파일의 타입 체크
export const checkFileType:I.ICheckFileType = (filePath, fileTree) => {
  const filePathLst = filePath.replaceAll("/", "/next/").split("/")
  filePathLst[0] = '/'
  
  let fileType;
  for(let i=1;i<filePathLst.length+1;i++){
    const pathSlice =  filePathLst.slice(0,i)
    const target = _.get(fileTree, pathSlice) 
    if(_.isEmpty(target)){ 
      break
    } else {
      fileType = target['type']
    }
  }
  return fileType
}


// 파일/폴더 찾기
export const findFile:I.IfindFile = (filePath, initialState)=> {
  const filePathLst = filePath.replaceAll("/", "/next/").split("/")
  filePathLst[0] = '/' 
  if (typeof initialState === 'string'){
    initialState = JSON.parse(initialState)
  }
  return _.get(initialState, filePathLst)
}

// 파일/폴더 삭제
export const deleteFile:I.IdeleteFile = (fileTree, filePath)=> {
  const filePathLst = filePath.replaceAll("/", "/next/").split("/")
  filePathLst[0] = '/' 
  _.unset(fileTree, filePathLst) 
}


// 파일/폴더 이동 
export const move:I.Imove = (fileTree, fromPath, toPath) => {
  const target = findFile(fromPath, fileTree) // 이동시킬 브랜치
  deleteFile(fileTree, fromPath) // 이동 브랜치 삭제
  const filePathLst = toPath.replaceAll("/", "/next/").split("/")
  filePathLst[0] = '/' 
  _.set(fileTree, [...filePathLst, "next"], {[fromPath.slice(-1)]: target}) // 이동할 브랜치로 삽입
}


// recursive change
export const recursiveChange:I.IrecursiveChange = (fileTree, filePath, _hide)=> {
  const filePathLst = filePath.replaceAll("/", "/next/").split("/")
  filePathLst[0] = '/' 
  const recursiveChange = (state:any) => {
    if (!state.next){
      return
    }
    state.hide = _hide === 'hide' ? true: false
    for(let k of Object.keys(state.next)){
      recursiveChange(state.next[k])
    }
  }
  _.update(fileTree, filePathLst, function(n){
    recursiveChange(n)
    return n
  });
}

/**
 * 두 경로에 있는 파일 노드를 연결해주는 함수 
 * @param fileTree 파일트리
 * @param referred 참조되는 노드 path
 * @param referring 참조하는 노드 path
 */

export const recursiveLink: I.ILink = (fileTree, referred, referring) => {
  const referringNode = findFile(referring.slice(0,-2), fileTree)
  const referredNode = findFile(referred, fileTree)

  if (referredNode.link === referring.slice(0,-2)){
    const ans = window.confirm("파일이 서로를 연결하며 무한 심볼릭 루프가 생성됩니다. 원하시던 결과가 맞나요?")
    if (!ans){
      return
    }
  } 
  referringNode['link'] = referred
}
