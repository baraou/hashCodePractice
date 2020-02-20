import { map, sumBy, orderBy, find, filter, differenceBy } from 'lodash';

import { Book, Library, Input } from './parser';
import { Output } from './print';

const blacklist = new Map<number, boolean>();

function removeLibrary(toRemove: Library, libraries: Library[]): Library[] {
  const bookIds = toRemove.books.map(book => book.id);

  bookIds.forEach(id => { blacklist.set(id, true) });

  return libraries;
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
