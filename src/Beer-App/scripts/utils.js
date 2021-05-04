const debounce = (fn, timeout = 300) => {
  let timer;
  return (...args) => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => fn.apply(this, args), timeout);
  };
};

module.exports = debounce;
