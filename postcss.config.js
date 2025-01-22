
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import nestingPlugin from 'tailwindcss/nesting/index.js';

export default {
  plugins: [
    nestingPlugin(),
    tailwindcss(),
    autoprefixer()
  ]
}
