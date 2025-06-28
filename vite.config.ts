import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import { libInjectCss } from 'vite-plugin-lib-inject-css';

export default defineConfig({
  base: `/mui-jalali-calendar`,
  plugins: [
    react(),
    libInjectCss(),
    dts({ include: ['src'] })
  ],
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'MuiJalaliCalendar',
      fileName: (format) => `mui-jalali-calendar.${format}.js`
    },
    rollupOptions: {
      external: ['react', 'react-dom', '@mui/x-date-pickers', '@mui/material', 'date-fns-jalali'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          '@mui/x-date-pickers': 'MuiDatePickers',
          '@mui/material': 'MuiMaterial',
          'date-fns-jalali': 'DateFnsJalali'
        }
      }
    }
  }
});