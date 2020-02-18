function add(a: number, b: { id: number, value: number}) {
  return a + b.value;
}

export function resolve(data: { maxSlices: number, typeCount: number, slicesCount: number[] } | null) {
  if (!data) return { pizzas: [], slices: 0 };
  const total = data.slicesCount.reduceRight((total: { pizzas: number[], slices: number }, slices: number, key: number) => {
    const tmp = total.slices + slices;
    if (tmp < data.maxSlices) return { pizzas: [...total.pizzas, key], slices: total.slices + slices };
    return total;
  }, { pizzas: [], slices: 0 });
  // let slices: { id: number, value: number}[] = [];
  // for (let i = data.slicesCount.length - 1; i > -1; --i) {
  //   const curr = data.slicesCount[i];
  //   const total = slices.reduce(add, 0);
  //   if (total === data.maxSlices) break;
  //   if (total > data.maxSlices) {

  //   }
  // }
  return total;
}
