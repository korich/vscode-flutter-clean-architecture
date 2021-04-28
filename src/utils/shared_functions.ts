import * as vscode from 'vscode';
import fs = require("fs");
import path = require("path");

import { getWorkspaceFolder } from './workspace_util';

export function createFolder(folderPath: string, includeDotKeep: boolean) {
  const fullPath = _getWorkspacePath(folderPath);

  _createFolder(folderPath);

  if (includeDotKeep === true) {
    _createFile(fullPath, ".keep", "");
  }
}

export function createFile(folderPath: string, filename: string, content: string) :void { 
  _createFile(_getWorkspacePath(folderPath), filename, content);
};


//only used internally
function _createFile(folderPath: string, filename: string, content: string) : void {
  //Create the folder if it does not exist.
  _createFolder(folderPath);

  fs.writeFile(path.join(folderPath, filename), content, (err: any) => {
    if (err) {
      return vscode.window.showErrorMessage(
        "Failed to create boilerplate file!"
      );
    }
    vscode.window.showInformationMessage("File created");
  });
}

function _createFolder(folderPath: string) : void {
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }
}

function _getWorkspacePath(newpath: string) : string {
  const wsPath = getWorkspaceFolder();

  return path.join(wsPath, newpath);
}