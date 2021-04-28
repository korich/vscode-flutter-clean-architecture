import * as vscode from 'vscode';
import { setUpProject } from './set_up';
import { createFeature } from './feature_generator';

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
