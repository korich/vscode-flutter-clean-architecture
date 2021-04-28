import * as vscode from 'vscode';
import { getProjectName } from './utils/flutter_project_util';

export async function testing() {
  
  vscode.window.showErrorMessage(getProjectName());
}

