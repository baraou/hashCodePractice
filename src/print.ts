import fs from 'fs';

export function print(total: { pizzas: number[], slices: number }, filename: string | undefined) {
  fs.writeFileSync(`./outputs/${filename}`, `${total.pizzas.length}\n${total.pizzas.join(' ')}`);
}
