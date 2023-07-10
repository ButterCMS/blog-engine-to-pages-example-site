// ./pages/_app.js

import "@/styles/globals.css";
import Link from "next/link";

export default function App({ Component, pageProps }) {
  return (
    <>
      <header className="site-header site-section">
        <div className="wrapper">
          <Link href="/" className="site-logo no-underline">
            <span className="font-black">LuminaClick</span>
          </Link>

          <nav className="site-nav">
            <div className="wrapper">
              <ul className="site-nav__list">
                <li className="site-nav__item">
                  <Link href="/products">Products</Link>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </header>
      <Component {...pageProps} />
    </>
  );
}
