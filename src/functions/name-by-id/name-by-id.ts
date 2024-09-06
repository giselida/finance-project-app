export function getNameById(options: Array<{ id: number; name: string }>, id: number): string {
  const item = options.find((option) => option.id === id);
  return item ? item.name : "";
}
