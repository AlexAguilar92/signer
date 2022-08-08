const hasArrayDuplicates = (arr: any[]) => {
  const set = new Set(arr);
  return !(set.size === arr.length);
};

export default hasArrayDuplicates;
