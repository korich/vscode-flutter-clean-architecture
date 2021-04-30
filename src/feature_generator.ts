import * as vscode from 'vscode';
import * as changeCase from "change-case";

import { getFeatureFolders } from './settings/folders';
import { createFolder } from './shared_utils/file_util';

export async function createFeature() {
	const featureName = await vscode.window.showInputBox({
		placeHolder: 'Enter feature name (add spaces between words ie "special users"):',
  });
  
	const includeDotKeep = await vscode.window.showQuickPick(['yes', 'no'], {
		placeHolder: 'include .keep'
	});

  if (featureName !== undefined) {
    
    const snakeCaseFeatureName = changeCase.snakeCase(featureName.toLowerCase());
    createFolders(snakeCaseFeatureName, includeDotKeep === 'yes');
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

