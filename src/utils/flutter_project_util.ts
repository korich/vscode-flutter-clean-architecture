import * as vscode from 'vscode';
import path = require("path");
import fs = require("fs");

import { getWorkspaceFolder } from '../shared_utils/workspace_util';
import { getRequiredPackages } from '../settings/packages';
import { getPackageVersion } from './pubdev_util';

export const getProjectName = (): string => {
  const pubspec = _loadPubspec();

  return pubspec.name;
};

export const addPackages = async (): Promise<void> => {
  let pubspec = _loadPubspec();

  const packages = getRequiredPackages();

  let updateRequired = false;

  for (let index = 0; index < packages.length; index++) {
    const packageName = packages[index];

    if (pubspec.dependencies[packageName] === undefined) {
      const version = await getPackageVersion(packageName);

      pubspec.dependencies[packageName] = '^' + version;
      updateRequired = true;
    }

  }

  if (updateRequired) {
    _replacePubspec(pubspec);
  }
  
};

function _loadPubspec(): any {
  const yaml = require('js-yaml');

  const pubspecPath =  _pubspecPath();

  if (fs.existsSync(pubspecPath)) {
    return yaml.load(fs.readFileSync(pubspecPath, 'utf8'));
  }

  return vscode.window.showErrorMessage(
    "pubspec.yaml is missing."
  );
}

function _replacePubspec(data: any): void {
  const yaml = require('js-yaml');

  const pubspecPath = _pubspecPath();

  let yamlStr = yaml.safeDump(data);
  fs.writeFileSync(pubspecPath, yamlStr, 'utf8');
}

function _pubspecPath(): string {
  return path.join(getWorkspaceFolder(), "pubspec.yaml");
}
