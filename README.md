# emoji-cheatsheets

This sends a request to the [API endpoint for emojis](https://api.github.com/emojis) and
builds Markdown files for emojis.

To prevent rendering every emoji all at once, emojis are collected by their first letter
(all emojis that start with "a" are in `a.md`, emojis that start with "b" are in `b.md`,
etc.). If you _really_ want render all emojis at once, you can view `all.md`.

It will also attempt to categorize emojis. See [the categories](./scripts/categories.mjs).
The categories are a work in progress, and contributions are welcome!

Emojis are refreshed monthly via a workflow.
