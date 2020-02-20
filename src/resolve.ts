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

export function resolve(input: Input) {
  const output: Output = { libraries: input.libraries };
  return output;
}
