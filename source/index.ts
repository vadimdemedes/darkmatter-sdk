// eslint-disable-next-line n/file-extension-in-import
import zod from 'astro/zod';

export function text() {
	return zod.string();
}

export function dateTime() {
	return zod.date();
}

export type Config = {
	collections: Record<
		string,
		{
			basePath: string;
		}
	>;
};

export function defineConfig(config: Config) {
	return config;
}
