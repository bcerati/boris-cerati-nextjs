import '../styles/globals.css';
import '../styles/prism-atom-dark.css';

import { config } from '@fortawesome/fontawesome-svg-core';

import '@fortawesome/fontawesome-svg-core/styles.css';
import Navbar from '../components/navbar';
import RightBar from '../components/rightBar/RightBar';

import 'prismjs/themes/prism.css';

config.autoAddCss = false;

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Navbar />

      <div className="container mx-auto ">
        <div className="flex flex-wrap py-6">
          <div className="w-full lg:w-2/3 flex flex-col items-center px-3">
            <Component {...pageProps} />
          </div>

          <RightBar />
        </div>
      </div>
    </>
  );
}

export default MyApp;
