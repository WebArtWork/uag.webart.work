// SSR-only globals so browser-only libs don't crash during prerender/route extraction.
class MemoryLocalStorage implements Storage {
	private map = new Map<string, string>();

	get length() {
		return this.map.size;
	}
	clear() {
		this.map.clear();
	}
	getItem(key: string) {
		return this.map.has(key) ? this.map.get(key)! : null;
	}
	key(index: number) {
		return Array.from(this.map.keys())[index] ?? null;
	}
	removeItem(key: string) {
		this.map.delete(key);
	}
	setItem(key: string, value: string) {
		this.map.set(key, String(value));
	}
}

const g = globalThis as any;

g.localStorage ??= new MemoryLocalStorage();
g.sessionStorage ??= new MemoryLocalStorage();

g.navigator ??= { userAgent: 'node' };

g.document ??= {
	addEventListener() {},
	removeEventListener() {},
	createElement() {
		return {};
	},
	querySelector() {
		return null;
	},
} as any;

g.window ??= {
	addEventListener() {},
	removeEventListener() {},
	document: g.document,
	navigator: g.navigator,
	location: { href: '' },

	// timers (forward to Node globals)
	setTimeout: g.setTimeout.bind(g),
	clearTimeout: g.clearTimeout.bind(g),
	setInterval: g.setInterval.bind(g),
	clearInterval: g.clearInterval.bind(g),

	// optional but common
	requestAnimationFrame: (cb: any) => g.setTimeout(() => cb(Date.now()), 16),
	cancelAnimationFrame: (id: any) => g.clearTimeout(id),

	matchMedia: () => ({
		matches: false,
		addListener() {},
		removeListener() {},
		addEventListener() {},
		removeEventListener() {},
	}),
	getComputedStyle: () => ({ getPropertyValue: () => '' }),
} as any;

import {
	BootstrapContext,
	bootstrapApplication,
} from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { config } from './app/app.config.server';

const bootstrap = (context: BootstrapContext) =>
	bootstrapApplication(AppComponent, config, context);

export default bootstrap;
