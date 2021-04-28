import * as vscode from 'vscode';
import path = require("path");
import fs = require("fs");

import { getWorkspaceFolder } from './workspace_util';

export const getProjectName = (): string => {
  const pubspec = _loadPubspec();

  return pubspec.name;
};


function _loadPubspec(): any {
  const yaml = require('js-yaml');
  
  const pubspecPath =  path.join(getWorkspaceFolder(), "pubspec.yaml");

  if (fs.existsSync(pubspecPath)) {
    return yaml.load(fs.readFileSync(pubspecPath, 'utf8'));
  }

  return vscode.window.showErrorMessage(
    "pubspec.yaml is missing."
  );
}