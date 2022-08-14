<?php

class MyClass {
  function if() {
    if (true) {
      return 1;
    } elseif (true) {
      return 2;
    } else {
      return 3;
    }
  }

  function switch() {
    switch (1) {
      case 3:
        return 1;
      case 5:
        return 2;
      default:
        break;
    }
  }

  function for() {
    for ($i = 0; $i < 100; $i++) {}
  }

  function foreach() {
    foreach(range(0, 100) as $value) {}
  }

  function conditional() {
    return true ? 1 : 2;
  }

  function while() {
    while (false) {}
  }

  function try() {
    try {
      $this->if();
    } catch (RuntimeException $e) {
    }
  }

  function ampersand() {
    return 1 && 2;
  }

  function barbar() {
    return 1 || 2;
  }

  function do() {
    do {
      return 1;
    } while (true);
  }

  function label() {
    for ($i = 0; $i < 0; $i++) {
      goto label;
    }
    label:
  }

  function function() {
    return function () {};
  }

  function arrowFunction() {
    return fn() => 1;
  }

  function nullishCoalescingOperator() {
    return null ?? 0;
  }

  function optionalChaining() {
    $obj = new stdClass();
    return $obj?->b;
  }

  function match() {
    return  match('a') {
      'apple' => 'This food is an apple',
      'bar' => 'This food is a bar',
      'cake' => 'This food is a cake',
    };
  }
}

trait MyTrait {
  function thisIsMethod() {
    return 1;
  }
}

function Func(int ...$arg) {
  return min($arg) + 3;
}
