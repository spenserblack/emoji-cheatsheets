# emoji-cheatsheets

This sends a request to the [API endpoint for emojis](https://api.github.com/emojis) and
builds Markdown files for emojis.

To prevent rendering every emoji all at once, emojis are collected by their first letter
(all emojis that start with "a" are in `a.md`, emojis  that start with "b" are in `b.md`,
etc.). If you *really* want render all emojis at once, you can view `all.md`.
