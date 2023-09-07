# Darkmatter SDK [![test](https://github.com/vadimdemedes/darkmatter-sdk/actions/workflows/test.yml/badge.svg)](https://github.com/vadimdemedes/darkmatter-sdk/actions/workflows/test.yml)

> Enhance [Darkmatter](https://getdarkmatter.dev) integration with your [Astro](https://astro.build) website.

## Install

```sh
npm install --save-dev darkmatter-sdk
```

## Usage

### Define a multi-line text field

Use `text()` to define a text field that shows a textarea instead of a single-line input like `zod.string()` does.

`text()` returns the same [`ZodString`](https://zod.dev/?id=strings) object as `zod.string()`.

```js
import {z as zod, defineCollection} from 'astro:content';
import {text} from 'darkmatter-sdk';

const posts = defineCollection({
  schema: zod.object({
    title: zod.string(),
    description: text()
  });
});

export const collections = {posts};
```

![](media/text-field.png)

### Define a date time field

Use `dateTime()` to define a date field that allows user to set the time, in addition to the date.

`dateTime()` returns the same [`ZodDate`](https://zod.dev/?id=dates) object as `zod.date()`.

```js
import {z as zod, defineCollection} from 'astro:content';
import {dateTime} from 'darkmatter-sdk';

const posts = defineCollection({
  schema: zod.object({
    title: zod.string(),
    date: dateTime()
  });
});

export const collections = {posts};
```

![](media/date-time-field.png)

### Configure a custom entry preview URL

Darkmatter assumes that each entry's URL equals to content collection's name followed by an entry's slug. For example, when editing an entry in "posts" content collection, Darkmatter thinks the entry's URL is `/posts/[slug]`.

However, that may not always be the case. Blog posts could live in a "posts" content collection, but they're actually displayed on a `/blog/[slug]` page. When you'll try to open an entry in the browser from Darkmatter, you'll see a 404 page.

To work with that use case, you need to tell Darkmatter what is the right URL to open for each entry.

Let's take this example `src/content/config.js` file.

```js
import {z as zod, defineCollection} from 'astro:content';

const posts = defineCollection({
  schema: zod.object({
    title: zod.string()
  });
});

export const collections = {posts};
```

To customize the entry preview URL, create a `darkmatter.config.js` file in the root project folder with this content:

```js
import {defineConfig} from 'darkmatter-sdk';

export default defineConfig({
	collections: {
		posts: {
			basePath: '/blog',
		},
	},
});
```

Now Darkmatter will open the `/blog/[slug]` page, instead of `/posts/[slug]`.
