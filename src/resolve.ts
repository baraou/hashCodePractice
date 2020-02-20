import { map, sumBy, orderBy, find, filter } from 'lodash';

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
    books: library.books.filter(book => {
      const tmp = !(bookIds.indexOf(book.id) >= 0);
      return tmp;
    })
  }));
  return filteredLibraries;
}

function sort(libraries: Library[], days: number): any {
  const sorted = orderBy(map(libraries, (library, id) => {
    const books = library.books.slice(0, (days - library.signupTime) * library.booksPerDay);
    const score = sumBy(books, 'score');
    return { libraryId: library.id, score };
  }), 'score', 'desc');
  return find(libraries, { id: sorted[0].libraryId });
}

export function resolve(input: Input) {
  let libraries = input.libraries;
  let days = input.days;
  const res = [];

  while (!!libraries.length) {
    const best = sort(libraries, days);
    days -= best.signupTime;
    res.push(best);
    libraries = filter(libraries, (library) => library.id != best.id);
    libraries = removeLibrary(best, libraries);
  }

  return { libraries: res };
}
