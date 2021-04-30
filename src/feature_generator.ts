import * as vscode from 'vscode';

import { getFeatureFolders } from './settings/folders';
import { createFolder } from './shared_utils/file_util';

export async function createFeature() {
	const feature = await vscode.window.showInputBox({
		placeHolder: 'enter feature name',
  });
  
	const includeDotKeep = await vscode.window.showQuickPick(['yes', 'no'], {
		placeHolder: 'include .keep'
	});

  if (feature !== undefined) {
    createFolders(feature, includeDotKeep === 'yes');
  } else {
    vscode.window.showErrorMessage('No feature name entered.');
  }

}

function createFolders(feature: string, includeDotKeep: boolean): void {
  if (vscode.workspace.workspaceFolders !== undefined) {

    for (let folder of getFeatureFolders()) {
      //TODO: use path joing for this?
      createFolder('lib/features/' + feature + '/' + folder, includeDotKeep);
      createFolder('test/features/' + feature + '/' + folder, includeDotKeep);
    }

  } else {
    vscode.window.showErrorMessage('No active workspace.');
  }
}

