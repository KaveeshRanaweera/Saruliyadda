import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

function copyStaticFilesPlugin() {
  return {
    name: 'copy-static-files',
    writeBundle() {
      const copyRecursiveSync = (src, dest) => {
        if (!fs.existsSync(src)) return;
        const stats = fs.statSync(src);
        if (stats.isDirectory()) {
          fs.mkdirSync(dest, { recursive: true });
          fs.readdirSync(src).forEach(childItemName => {
            copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName));
          });
        } else {
          fs.copyFileSync(src, dest);
        }
      };
      
      // Copy images to dist so GitHub Pages can serve them
      copyRecursiveSync('HomePageImages', 'dist/HomePageImages');
      copyRecursiveSync('Images', 'dist/Images');
    }
  }
}

export default defineConfig({
  plugins: [react(), copyStaticFilesPlugin()],
  base: '/Saruliyadda/',
})
