export interface IValidateCommand {
   (command: string, tree: any): string;
}

export interface IConfirmFn {
   (confirmMessage: string): void | string;
}
