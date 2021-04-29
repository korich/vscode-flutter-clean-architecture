import * as vscode from 'vscode';

import { getSetUpFolders } from './utils/folders';
import { createFile, createFolder } from './utils/file_util';
import { getFailuresTemplate, getFixtureReaderTemplate, getUsecaseTemplate } from './templates/core_templates';

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

    //Create the default classes
    createFile('lib/core/usecases', getUsecaseTemplate(), 'usecase.dart');
    createFile('lib/core/error', getFailuresTemplate(), 'failures.dart');
    createFile('test/fixtures', getFixtureReaderTemplate(), 'fixture_reader.dart');

  } else {
    vscode.window.showErrorMessage('No active workspace.');
  }
}