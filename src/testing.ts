import * as vscode from 'vscode';
import { getProjectName } from './utils/flutter_project_util';
import { createFile } from './utils/shared_functions';

export async function testing() {
  
  createFile('lib/new/mpre/hi/', 'test.dart', "hello");

  vscode.window.showErrorMessage(getProjectName());
}

