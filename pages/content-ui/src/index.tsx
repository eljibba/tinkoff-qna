import { createRoot } from 'react-dom/client';
import App from '@src/app';
// eslint-disable-next-line
// @ts-ignore
import tailwindcssOutput from '@src/tailwind-output.css?inline';

const root = document.createElement('div');
root.id = 'chrome-extension-boilerplate-react-vite-content-view-root';
root.style.position = 'fixed';
root.style.zIndex = '2147483647';
root.style.right = '25px';
root.style.bottom = '35px';
root.style.fontSize = '13px';
root.style.font = '13px / 23px haas, pragmatica, -apple-system, BlinkMacSystemFont, Roboto, Helvetica Neue, Arial, sans-serif';
document.body.prepend(root);

const rootIntoShadow = document.createElement('div');
rootIntoShadow.id = 'shadow-root';

const shadowRoot = root.attachShadow({ mode: 'open' });

shadowRoot.appendChild(rootIntoShadow);

const clearUXsInterval = setInterval(clearUXs, 500);
function clearUXs() {
  const uxs = document.querySelectorAll("[class^=uxs]");
  if (uxs.length > 0) {
    uxs.forEach((elem) => elem.remove());
    clearInterval(clearUXsInterval);
  }
}
/** Inject styles into shadow dom */
const styleElement = document.createElement('style');
styleElement.innerHTML = tailwindcssOutput;
shadowRoot.appendChild(styleElement);

createRoot(rootIntoShadow).render(<App />);
