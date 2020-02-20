import fs from 'fs';
import assert from 'assert';

export type Book = {
  score: number,
};

export type Library = {
  id: number,
  signupTime: number,
  booksId: number[],
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

  const books = booksScore.map(v => ({score: Number(v)}));
  const libraries: Library[] = new Array();

  let line = 2;
  for (let i = 0; i < libsCount; i++, line += 2) {
    const [libraryBooks, signupTime, booksPerDay] = byLine[line].split(' ').map(v => Number(v));
    const libraryBooksIds = byLine[line+1].split(' ');
    const booksId = libraryBooksIds.map(v => Number(v))
    assert(libraryBooks === libraryBooksIds.length);
    libraries.push({ id: i, signupTime, booksId , booksPerDay });
  }

  return { books, libraries, days };
}
