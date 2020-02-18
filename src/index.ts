import { parser } from "./parser";
import { resolve } from "./resolve";
import { print } from "./print";

console.log('start');

const parsedData = parser(process.argv[3]);
const result = resolve(parsedData);
print(result, process.argv[3].split('/').pop());

console.log(`Score is ${result.slices} out of ${parsedData && parsedData.maxSlices}`);

console.log('end');
