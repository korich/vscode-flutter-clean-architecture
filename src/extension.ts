import * as vscode from 'vscode';
import { setUpProject } from './setUp';
import { createFeature } from './featureGenerator';

export function activate(context: vscode.ExtensionContext) {

	let disposableSetUp = vscode.commands.registerCommand('korich-fca.setUp', () => {
		setUpProject();
	});

	let disposableCreate = vscode.commands.registerCommand('korich-fca.createFeature', () => {
		createFeature();
	});

	context.subscriptions.push(disposableSetUp);
	context.subscriptions.push(disposableCreate);
}

// this method is called when your extension is deactivated
export function deactivate() {}
