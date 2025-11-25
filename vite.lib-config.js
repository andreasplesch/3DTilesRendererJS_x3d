import { loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { packageAliases } from './vite.config.js';

export default ( { mode } ) => {

	process.env = { ...process.env, ...loadEnv( mode, process.cwd() ) };

	const entry = {
		'index': './src/index.js',
		// 'index.plugins': './src/plugins.js',
		// 'index.core': './src/core/renderer/index.js',
		// 'index.three': './src/three/renderer/index.js',
		// 'index.r3f': './src/r3f/index.jsx',
		// 'index.core-plugins': './src/core/plugins/index.js',
		// 'index.three-plugins': './src/three/plugins/index.js'
	};

	return {
		root: './',
		envDir: '.',
		base: '',
		resolve: {
			alias: packageAliases,
		},
		build: {
			sourcemap: true,
			outDir: './build/',
			minify: false,
			rollupOptions: {
				_external: ( p ) => {

					return ! /^[./\\]/.test( p ) && ! /^3d-tiles-renderer/.test( p );

				},
				treeshake: true
				
			},
			lib: {
				entry,
				formats: [ 'umd' ],
				name: '3DTilesRenderer'
			},
			//target: 'es2015',
		},
		plugins: [ react() ],
	};

};
