import * as vscode from 'vscode';

import { getSetUpFolders } from './folders';
import { createFolder } from './sharedFunctions';

/**
 * Shows an input box using window.showInputBox().
 */
export async function setUpProject() {
  let i = 0;
	const includeDotKeep = await vscode.window.showQuickPick(['yes', 'no'], {
		placeHolder: 'include .keep',
    onDidSelectItem: item => {}
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