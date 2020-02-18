export function resolve(data: { maxSlices: number, typeCount: number, slicesCount: number[] } | null) {
  if (!data) return { pizzas: [], slices: 0 };
  const total = data.slicesCount.reduce((total: { pizzas: number[], slices: number }, slices: number) => {
    const tmp = total.slices + slices;
    if (tmp < data.maxSlices) return { pizzas: [...total.pizzas, slices], slices: total.slices + slices };
    return total;
  }, { pizzas: [], slices: 0 });
  return total;
}
