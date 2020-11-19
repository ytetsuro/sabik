/* eslint-disable */
class Class {
  if() {
    if (true) {
      return 1;
    }
  }

  switch(number: number) {
    switch (number) {
      case 3:
        return 1;
      case 5:
        return 2;
      default:
        break;
    }
  }

  for() {
    for (let i = 0; i < 100; i++) {}
  }

  forIn() {
    for (let i in [1, 2]) {
    }
  }

  forOf() {
    for (let i of [1, 2]) {
    }
  }

  conditional() {
    return true ? 1 : 2;
  }

  while() {
    while (false) {}
  }

  try() {
    try {
      this.if();
    } catch (_) {}
  }

  ampersand() {
    return 1 && 2;
  }

  barbar() {
    return 1 || 2;
  }

  do() {
    do {
      return 1;
    } while (true);
  }

  label() {
    label: for (let i = 0; i < 0; i++) {
      continue label;
    }
  }

  function() {
    return function () {};
  }

  arrowFunction() {
    return () => {};
  }
}

/**
 * This is Test Fixture.
 */
const FauxClass = () => {
  // this is comment.
  return {
    method1: () => {},
    method2: () => {},
  };
};

const Func = (...args: number[]) => {
  return Math.min(...args, Infinity) + 3;
};
