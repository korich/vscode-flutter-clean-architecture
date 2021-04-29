import * as vscode from 'vscode';
import { getProjectName } from './utils/flutter_project_util';
import { createFile } from './utils/file_util';


import fs = require("fs");
import { getPackageVersion } from './utils/pubdev_utils';

export async function testing() {
  
  // let content = 'hello';


  // createFile('lib/new/mpre/hi/', 'testing.dart', content);


  // vscode.window.showErrorMessage(getProjectName());

  let result = await getPackageVersion('equatable');

  vscode.window.showErrorMessage(result);

  
}

