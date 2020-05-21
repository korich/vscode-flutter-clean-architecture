import * as vscode from 'vscode';

import { getWorkspaceFolder } from './workspaceUtil';

export function createFolder(path: string, includeDotKeep: boolean) {
  const wsedit = new vscode.WorkspaceEdit();
  
  const wsPath = getWorkspaceFolder(undefined);
  const filePath = vscode.Uri.file(wsPath + '/' + path + '/.keep');
  wsedit.createFile(filePath, { ignoreIfExists: true });

  if (includeDotKeep === false) {
    wsedit.deleteFile(filePath);
  }

  vscode.workspace.applyEdit(wsedit);
  
}