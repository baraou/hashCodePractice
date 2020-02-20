import { Book, Library, Input } from './parser';
import { Output } from './print';

// export type Book = {
//   score: number,
// };

// export type Library = {
//   signupTime: number,
//   booksId: number[],
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

export function resolve(input: Input) {
  const output: Output = { libraries: input.libraries };

  const libraries = input.libraries;

  while (!!libraries.length) {

  }

  return output;
}
