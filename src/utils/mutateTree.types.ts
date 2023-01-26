type filePath = string;

export interface IRecursiveaddFile {
   (fileTree: any, fileType: string, filePath: filePath): void;
}

export interface IfindFile {
   (initialState: any, filePath: filePath): any;
}

export interface IdeleteFile {
   (fileTree: any, filePath: filePath): void;
}

export interface Imove {
   (fileTree: any, fromPath: filePath, toPath: filePath): void;
}

export interface IrecursiveChange {
   (fileTree: any, filePath: filePath, hide: string): void;
}

export interface ILink {
   (fileTree: any, referred: filePath, referring: filePath): void;
}

export interface ICheckFileType {
   (fileTree: any, filePath: string): string;
}
