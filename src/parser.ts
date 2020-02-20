import fs from 'fs';
import assert from 'assert';
import { uniqWith, orderBy } from 'lodash';

export type Book = {
  id: number,
  score: number,
};

export type Library = {
  id: number,
  signupTime: number,
  books: Book[],
  booksPerDay: number,
};

export type Input = {
  books: Book[],
  libraries: Library[],
  days: number,
};

export function parser(filename: string): Input {
  const buf = fs.readFileSync(filename);
  const fileContent = buf.toString();

  const byLine = fileContent.split('\n');

  const [booksCount, libsCount, days] = byLine[0].split(' ').map(v => Number(v));

  const booksScore = byLine[1].split(' ');
  assert(booksScore.length === booksCount);

  const books = booksScore.map((v,index) => ({id: index, score: Number(v)}));
  const libraries: Library[] = new Array();

  let line = 2;
  for (let i = 0; i < libsCount; i++, line += 2) {
    const [libraryBooksCount, signupTime, booksPerDay] = byLine[line].split(' ').map(v => Number(v));
    const libraryBooksIds = byLine[line+1].split(' ');
    assert(libraryBooksCount === libraryBooksIds.length);

    const booksId = libraryBooksIds.map(v => Number(v))
    const libraryBooks = booksId.map(id => books[id]);

    const uniqueBooks = uniqWith(libraryBooks, (v, w) => v.id === w.id);
    const sortedBooks = orderBy(uniqueBooks, v => v.score, 'desc');

    libraries.push({ id: i, signupTime, books: sortedBooks, booksPerDay });
  }

  return { books, libraries, days };
}
