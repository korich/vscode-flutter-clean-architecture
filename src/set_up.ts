import * as vscode from 'vscode';

import { getSetUpFolders } from './utils/folders';
import { createFolder } from './utils/file_util';

/**
 * Shows an input box using window.showInputBox().
 */
export async function setUpProject() {
	const includeDotKeep = await vscode.window.showQuickPick(['yes', 'no'], {
		placeHolder: 'include .keep'
	});

  createFolders(includeDotKeep === 'yes');
}

function createFolders(includeDotKeep: boolean): void {
  if (vscode.workspace.workspaceFolders !== undefined) {

    for (let folder of getSetUpFolders()) {
      createFolder('lib/' + folder, includeDotKeep);
      createFolder('test/' + folder, includeDotKeep);
    }

  } else {
    vscode.window.showErrorMessage('No active workspace.');
  }
}