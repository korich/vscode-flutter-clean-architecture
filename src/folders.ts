export function getFolders(): string[] {
  let list: string[] = [
    'data/datasources',
    'data/models',
    'data/repositories',
    'domain/entities',
    'domain/repositories',
    'domain/usecases',
    'presentation/bloc',
    'presentation/pages',
    'presentation/widgets'
  ];

  return list;
}