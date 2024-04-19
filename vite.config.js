import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

//cdhttps://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
})
