import * as changeCase from "change-case";
import { getProjectName } from "../utils/flutter_project_util";


export function getUsecaseTemplate(usecaseName: string): string {
  const pascalCaseUsecaseName = changeCase.pascalCase(usecaseName.toLowerCase());

  const projectName = getProjectName();
  return `import 'package:dartz/dartz.dart';

import 'package:${projectName}/core/error/failures.dart';
import 'package:${projectName}/core/usecases/usecase.dart';

class ${pascalCaseUsecaseName} implements UseCase<Object, NoParams> {
  ${pascalCaseUsecaseName}();

  @override
  Future<Either<Failure, Object>> call(params) async {
    //TODO: add logic
    throw Exception();
  }
}
`;
}


export function getUsecaseTestTemplate(usecaseName: string, featureName: string): string {
  const pascalCaseBlocName = changeCase.pascalCase(usecaseName.toLowerCase());
  const snakeCaseBlocName = changeCase.snakeCase(usecaseName.toLowerCase());
  return `part of '${snakeCaseBlocName}_bloc.dart';
abstract class ${pascalCaseBlocName}Event extends Equatable {
  const ${pascalCaseBlocName}Event();
  @override
  List<Object> get props => [];
}
`;
}