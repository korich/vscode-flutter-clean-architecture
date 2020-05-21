/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as vscode from 'vscode';

import { getFolders } from './folders';

/**
 * Shows an input box using window.showInputBox().
 */
export async function createFeature() {
	const feature = await vscode.window.showInputBox({
		placeHolder: 'enter feature name',
  });
  
  let i = 0;
	const includeDotKeep = await vscode.window.showQuickPick(['yes', 'no'], {
		placeHolder: 'include .keep',
    onDidSelectItem: item => {}
	});

  if (feature !== undefined) {
    createFolders(feature, includeDotKeep === 'yes');
  } else {
    vscode.window.showErrorMessage('No feature name entered.');
  }

}

function createFolders(feature: string, includeDotKeep: boolean): void {
  if (vscode.workspace.workspaceFolders !== undefined) {

    for (let folder of getFolders()) {
      createFolder('lib/features/' + feature + '/' + folder, includeDotKeep);
      createFolder('test/features/' + feature + '/' + folder, includeDotKeep);
    }

  } else {
    vscode.window.showErrorMessage('No active workspace.');
  }
}

function createFolder(path: string, includeDotKeep: boolean) {
  const wsedit = new vscode.WorkspaceEdit();

  if (vscode.workspace.workspaceFolders !== undefined) {
    const wsPath = vscode.workspace.workspaceFolders[0].uri.fsPath;
    const filePath = vscode.Uri.file(wsPath + '/' + path + '/.keep');
    wsedit.createFile(filePath, { ignoreIfExists: true });

    if (includeDotKeep === false) {
      wsedit.deleteFile(filePath);
    }

    vscode.workspace.applyEdit(wsedit);
  }
  
}