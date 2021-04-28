import * as vscode from 'vscode';
import { createFile } from './utils/shared_functions';

export async function testing() {
  

  createFile('path', 'blar.txt', "hi");
  
  vscode.window.showErrorMessage('hi');
}