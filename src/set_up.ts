import * as vscode from 'vscode';

import { getSetUpFolders } from './settings/folders';
import { createFile, createFolder } from './utils/file_util';
import { getFailuresTemplate, getFixtureReaderTemplate, getUsecaseTemplate } from './templates/core_templates';
import { addPackages } from './utils/flutter_project_util';

export async function setUpProject() {
	if (vscode.workspace.workspaceFolders !== undefined) {
  
    const includeDotKeep = await vscode.window.showQuickPick(['yes', 'no'], {
      placeHolder: 'include .keep'
    });

    _createFolders(includeDotKeep === 'yes');
    _createFiles();

    //This will add any required dart packages
    addPackages();

  }  else {
    vscode.window.showErrorMessage('No active workspace.');
  }
}

function _createFolders(includeDotKeep: boolean): void {
  for (let folder of getSetUpFolders()) {
    createFolder('lib/' + folder, includeDotKeep);
    createFolder('test/' + folder, includeDotKeep);
  }
}

function _createFiles() {
  //Create the default classes
  createFile('lib/core/usecases', 'usecase.dart', getUsecaseTemplate());
  createFile('lib/core/error', 'failures.dart', getFailuresTemplate());
  createFile('test/fixtures', 'fixture_reader.dart', getFixtureReaderTemplate());
}
