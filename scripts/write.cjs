const { writeFile } = require('fs/promises');
const { join } = require('path');

function fullPath(path) {
  return join(__dirname, '../sheets', path);
}

/**
 * Writes items to a Markdown table, with each row having a name and image.
 *
 * @param {string} path The path (relative to the sheets directory) to write to
 * @param {{name: string, url: string}[][]} items The rows of items to write
 */
exports.write = async function write(path, items) {
  const itemCount = items[0]?.length || 0;
  const header = '| ' + Array(itemCount).fill('Name | Image').join(' | ') + ' |';
  const separator = '| ' + Array(itemCount * 2).fill('---').join(' | ') + ' |';
  const content = items.map((row) => {
    return '| ' + row.map((item) => {
      if (!item) return ' | ';
      const { name, url } = item;
      return `\`:${name}:\` | <img src="${url}" alt="${name}" width="24" height="24" />`;
    }).join(' | ') + ' |';
  }).join('\n');

  await writeFile(fullPath(path), [header, separator, content].join('\n') + '\n');
}
