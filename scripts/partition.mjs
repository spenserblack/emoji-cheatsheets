const partitionSize = 4;

/**
 * Partitions an array into sets of arrays.
 *
 * null-pads the last set if necessary.
 */
export function partition(arr) {
  const result = [];
  for (let i = 0; i < arr.length; i += partitionSize) {
    result.push(arr.slice(i, i + partitionSize));
  }
  const last = result[result.length - 1];
  if (last.length < partitionSize) {
    result[result.length - 1] = last.concat(Array(partitionSize - last.length).fill(null));
  }
  return result;
}
