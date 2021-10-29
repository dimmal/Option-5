import * as cloneDeep from 'lodash/cloneDeep';

export function deepCopy<T>(value: T): T {
  return cloneDeep(value);
}
