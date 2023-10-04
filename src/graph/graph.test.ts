import {describe, expect, test} from '@jest/globals';
import { Graph } from './graph';

describe('sum module', () => {

    function sum(a: number, b: number): number {
        return a + b;
    }
  test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
  });
});