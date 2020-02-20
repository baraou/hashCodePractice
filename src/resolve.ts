import { map, sumBy, orderBy, find, filter, differenceBy } from 'lodash';

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

const blacklist = new Map<number, boolean>();

function removeLibrary(toRemove: Library, libraries: Library[]): Library[] {
  const bookIds = toRemove.books.map(book => book.id);

  bookIds.forEach(id => { blacklist.set(id, true) });

  const filteredLibraries = libraries.map(library => ({
    ...library,
    books: library.books.filter(book => !blacklist.has(book.id)),
  }));

  return filteredLibraries;
}

function scoreLibrary(library: Library, days: number): { library: Library, score: number } {
    const books = new Array();
    for (let i = 0; i < library.books.length && books.length < (days - library.signupTime)*library.booksPerDay; i++) {
      const book = library.books[i];
      if (blacklist.has(book.id)) continue;

      books.push(book);
    }

    const score = sumBy(books, 'score');
    const newLib = {
      ...library,
      books,
    };
    return { library: newLib, score };
}

function sort(libraries: Library[], days: number): Library {
  const scores = libraries.map(library => scoreLibrary(library, days));

  const ordered = orderBy(scores, score => score.score);
  return ordered[0].library;
}

export function resolve(input: Input) {
  const output: Output = { libraries: new Array() };

  let libraries = input.libraries;
  let days = input.days;
  const res = [];

  while (!!libraries.length) {
    const best = sort(libraries, days);

    if (!best.books.length) break;

    days -= best.signupTime;
    res.push(best);
    libraries = filter(libraries, (library) => library.id != best.id);
    libraries = removeLibrary(best, libraries);
    output.libraries.push(best);
  }

  return { libraries: res };
}
