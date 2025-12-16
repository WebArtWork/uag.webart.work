// Form components mapping is managed in `src/app/app.formcomponents.ts`.

export const environment = {
	roles: [],
	production: true,
	appId: 'appId',
	url: 'https://api.webart.work',
	sign: {
		logo: '',
		email: '',
		password: '',
	},
	image: {
		default: 'https://ngx.webart.work/assets/logo.png',
		logo: 'https://ngx.webart.work/assets/logo.png',
	},
	meta: {
		title: 'Web Art Work',
		description:
			'An amazing solution to build web or mobile app for your business',
		favicon: 'https://ngx.webart.work/assets/favicon.ico',
		image: 'https://ngx.webart.work/assets/logo.png',
	},
	defaultLanguageCode: 'en',
	languages: [
		{
			name: 'Ukrainian',
			origin: 'українська',
			code: 'uk',
		},
		{
			code: 'en',
			name: 'English',
			origin: 'English',
		},
	],
	cosmos: {
		chainId: 'uag-test-1',
		chainName: 'UAG Local',
		rpc: 'http://127.0.0.1:26657',
		rest: 'http://127.0.0.1:1317',

		bech32Prefix: {
			accAddr: 'uag',
			accPub: 'uagpub',
			valAddr: 'uagvaloper',
			valPub: 'uagvaloperpub',
			consAddr: 'uagvalcons',
			consPub: 'uagvalconspub',
		},

		coin: {
			denom: 'UAG',
			minimalDenom: 'uuag',
			decimals: 6,
		},

		gasPrice: {
			low: 0.01,
			average: 0.025,
			high: 0.04,
		},

		defaultGasPriceString: '0.025uuag',
	},
};
