import { defineConfig, UserConfig, type PluginOption } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import dts from 'vite-plugin-dts';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig(({ command, mode }) => {
  const plugins: PluginOption[] = [react()];

  if (mode === 'analyze') {
    plugins.push(
      visualizer({
        filename: 'dist/stats.html',
        open: true,
        gzipSize: true,
        brotliSize: true,
      }) as PluginOption
    );
  }

  const config: UserConfig = {
    plugins,
  };

  if (command === 'serve') {
    // Development mode - serve examples
    return {
      ...config,
      root: 'examples',
      server: {
        port: 3000,
        open: true,
      },
      resolve: {
        alias: {
          'react-pgn-viewer': path.resolve(__dirname, './src'),
        },
      },
    };
  }

  // Build mode - build library
  return {
    ...config,
    plugins: [
      ...config.plugins,
      dts({
        insertTypesEntry: true,
        tsconfigPath: path.resolve(__dirname, 'tsconfig.json'),
      }),
    ],
    build: {
      lib: {
        entry: path.resolve(__dirname, 'src/index.tsx'),
        name: 'ReactPgnViewer',
        fileName: (format) => `react-pgn-viewer.${format}.js`,
        formats: ['es', 'umd'],
      },
      rollupOptions: {
        external: [
          'react',
          'react-dom',
          'react/jsx-runtime',
          'react-dom/client',
          'react-is',
          'react/jsx-dev-runtime',
          '@emotion/react',
          '@emotion/styled',
          '@mui/icons-material',
          '@mui/material',
        ],
        output: {
          globals: {
            react: 'React',
            'react-dom': 'ReactDOM',
            'react/jsx-runtime': 'jsxRuntime',
            'react-dom/client': 'ReactDOMClient',
            'react-is': 'ReactIs',
            'react/jsx-dev-runtime': 'jsxDEV',
            '@emotion/react': 'emotionReact',
            '@emotion/styled': 'emotionStyled',
            '@mui/icons-material': 'MuiIcons',
            '@mui/material': 'MuiMaterial',
          },
        },
      },
      sourcemap: true,
      emptyOutDir: true,
      outDir: 'dist',
    },
  };
});
