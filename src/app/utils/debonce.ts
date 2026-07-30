 const debounce = <T extends (...args: string[]) => void>(
  fn: T,
  debounceTime = 500,
) => {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), debounceTime);
  };
};

export default debounce