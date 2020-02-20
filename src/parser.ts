import fs from 'fs';

export type Book = {
  score: number,
};

export type Library = {
  signupTime: number,
  booksId: number[],
  booksPerDay: number,
};

export type Input = {
  books: Book[],
  libraries: Library[],
  days: number,
};

export function parser(filename: string) {
  const buf = fs.readFileSync(filename);
  const fileContent = buf.toString();

  let i = 0;
}
