import fs from 'fs';

export function parser(filename: string) {
  const buf = fs.readFileSync(filename);
  const fileContent = buf.toString();
  const parsedContent = fileContent.match(/\d+/g);
  if (!parsedContent) return null;
  return { maxSlices: Number(parsedContent[0]), typeCount: Number(parsedContent[1]), slicesCount: parsedContent.slice(2).map(a => Number(a)) };
}
