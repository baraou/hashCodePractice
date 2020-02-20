import fs from 'fs';
import forEach from 'lodash/forEach';

import { Library } from './parser';

export type Output = {
  libraries: Library[],
}

export function print(output: Output, filename: string | undefined) {
  // first line - number of libraries to sign up
  // each library - 2 lines
    // ID numberOfBooksToBeScanned
    // IDS list no duplicates
  let result = `${output.libraries.length}\n`;
  forEach(output.libraries, (library, key) => result = `${result}${library.id} ${library.books.length}\n${library.books.map(b => b.id).join(' ')}\n`);
  fs.writeFileSync(`./outputs/${filename}`, result);
}
