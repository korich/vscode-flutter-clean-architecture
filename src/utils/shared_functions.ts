import * as vscode from 'vscode';
const fs = require("fs");
const path = require("path");

import { getWorkspaceFolder } from './workspace_util';

export function createFolder(folderPath: string, includeDotKeep: boolean) {

  const fullPath = _getWorkspacePath(folderPath);

  fs.mkdirSync(fullPath, { recursive: true });

  if (includeDotKeep === true) {
    _createFile(fullPath, ".keep", "");
  }
}

export function createFile(folderPath: string, filename: string, content: string) :void { 
  _createFile(_getWorkspacePath(folderPath), filename, content);
};


//only used internally
function _createFile(folderPath: string, filename: string, content: string) : void {
  fs.writeFile(path.join(folderPath, filename), content, (err: any) => {
    if (err) {
      return vscode.window.showErrorMessage(
        "Failed to create boilerplate file!"
      );
    }
    vscode.window.showInformationMessage("File created");
  });
}

function _getWorkspacePath(newpath: string) : string {
  const wsPath = getWorkspaceFolder();

  return path.join(wsPath, newpath);
}