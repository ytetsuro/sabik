<?php

Interface Presenter {
    function output(string $output): void;
}

class FizzBuzz {
    private Presenter $presenter;
    private $map = [
        15 => 'FizzBuzz',
        3 => 'Fizz',
        5 => 'Buzz'
    ];

    public function __constructor(Presenter $presenter) {
        $this->presenter = $presenter;
    }

    public function run(int $input): void {
        $this->presenter->output($this->getResult($input));
    }

    private function getResult(int $input): string {
        foreach ($this->map as $key => $value) {
            if ($input%$key === 0) {
                return $value;
            }
        }

        return $input;
    }
}