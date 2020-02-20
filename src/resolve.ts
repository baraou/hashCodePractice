import { map, sumBy, orderBy } from 'lodash';

import { Book, Library, Input } from './parser';
import { Output } from './print';

// export type Book = {
//   score: number,
//   id: number,
// };

// export type Library = {
//   signupTime: number,
//   books: Book[],
//   booksPerDay: number,
// };

// export type Input = {
//   books: Book[],
//   libraries: Library[],
//   days: number,
// };

function removeLibrary(toRemove: Library, libraries: Library[]): Library[] {
  const bookIds = toRemove.books.map(book => book.id);
  const filteredLibraries = libraries.map(library => ({
    ...library,
    books: library.books.filter(book => bookIds.indexOf(book.id) >= 0)
  }));
  return filteredLibraries;
}

function sort(libraries: Library[], days: number) {
  return orderBy(map(libraries, (library, id) => {
    const books = library.books.slice(0, days - library.signupTime);
    const score = sumBy(books, 'score');
    return { libraryId: library.id, score };
  }), 'score');
}

export function resolve(input: Input) {
  const output: Output = { libraries: input.libraries };

  const libraries = input.libraries;

  while (!!libraries.length) {

  }

  return output;
}
