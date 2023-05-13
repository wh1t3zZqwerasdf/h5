import {defineConfig, loadEnv} from 'vite';
import vue from '@vitejs/plugin-vue';
import {resolve} from 'path';
import styleImport, {VantResolve} from 'vite-plugin-style-import';
/* unplugin */
import AutoImport from 'unplugin-auto-import/vite';

/* WindiCSS */
import WindiCSS from 'vite-plugin-windicss';

const pathResolve = (dir: string) => {
    return resolve(__dirname, '.', dir);
};

const alias: Record<string, string> = {
    '@/': `${resolve(__dirname, 'src')}/`,
    '~/': `${resolve(__dirname, 'public')}/`,
};

// https://vitejs.dev/config/
export default ({mode}) => {
    const envConfig = loadEnv(mode, process.cwd());
    return defineConfig({
        base: './',
        plugins: [
            vue(),
            WindiCSS(),
            AutoImport({
                imports: ['vue'],
                dts: 'src/auto-import.d.ts',
                eslintrc: {
                    globalsPropValue: true,
                },
            }),
            styleImport({
                resolves: [VantResolve()],
                libs: [
                    {
                        libraryName: 'vant',
                        esModule: true,
                        resolveStyle: (name) => {
                            if (name == 'showToast') {
                                return `..es/toast/style/index`;
                            } else {
                                return `../es/${name}/style/index`;
                            }
                        },
                    },
                ],
            }),
        ],

        resolve: {
            alias,
            extensions: ['.js', '.json', '.ts'],
        },
        server: {
            host: '0.0.0.0',
            port: 4000,
            proxy: {
                '/api': {
                    // target: "http://192.168.1.61:10230/",
                    target: envConfig.VITE_APP_BASE_URL,
                    // target: 'http://192.168.1.28:17002/',
                    changeOrigin: true,
                    rewrite: (path) => path.replace(/^\/api/, ''),
                },
            },
        },
    })
}

