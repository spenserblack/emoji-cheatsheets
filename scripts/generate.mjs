#!/usr/bin/env node
import { Octokit } from "octokit";
import { categories } from './categories.mjs'
import { partition } from './partition.mjs'
import { write as writeMd } from './write.cjs'

const octokit = new Octokit({
  userAgent: 'spenserblack/emoji-cheatsheet',
  auth: process.env.GITHUB_TOKEN,
});

const { data: emojis } = await octokit.request('GET /emojis');

const categorizedEmojis = Object.entries(emojis).reduce((acc, [name, url]) => {
  const matchingCategories = Object.entries(categories).filter(([,regexes]) => regexes.some((regex) => regex.test(name)));

  return {
    ...acc,
    ...Object.fromEntries(matchingCategories.map(([category]) => [category, [...acc[category] ?? [], { name, url }]])),
  };
}, {});

const byPrefixEmojis = Object.entries(emojis).reduce((acc, [name, url]) => {
  const prefix = name[0];
  return {
    ...acc,
    [prefix]: [...acc[prefix] ?? [], { name, url }],
  };
}, {});

const allEmojis = Object.entries(emojis).map(([name, url]) => ({ name, url }));

await Promise.all([
  writeMd('all.md', partition(allEmojis)),
  ...Object.entries(categorizedEmojis).map(([category, emojis]) => writeMd(`categorized/${category}.md`, partition(emojis))),
  ...Object.entries(byPrefixEmojis).map(([prefix, emojis]) => writeMd(`by-prefix/${prefix}.md`, partition(emojis))),
]);
