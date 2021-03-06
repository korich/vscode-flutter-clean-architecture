import * as vscode from 'vscode';
import fs = require("fs");
import path = require("path");

import { getWorkspaceFolder } from './workspace_util';

export function createFolder(folderPath: string, includeDotKeep: boolean) {
  const fullPath = _getWorkspacePath(folderPath);

  _createFolder(fullPath);

  if (includeDotKeep === true) {
    _createFile(fullPath, ".keep", "");
  }
}

export function createFile(folderPath: string, filename: string, content: string) :void { 
  _createFile(_getWorkspacePath(folderPath), filename, content);
};


//only used internally
function _createFile(fullPath: string, filename: string, content: string) : void {
  //Create the folder if it does not exist.
  _createFolder(fullPath);

  let filePath = path.join(fullPath, filename);

  if (!fs.existsSync(filePath)) { //Don't create the file if it already exists
    fs.writeFile(filePath, content, (err: any) => {
      if (err) {
        return vscode.window.showErrorMessage(
          "Failed to create file!"
        );
      }
      vscode.window.showInformationMessage("File created");
    });
  }
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