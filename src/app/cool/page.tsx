// `app/cool/page.tsx` is the UI for the `/cool` URL
import Script from "next/script";

export default function Page() {
  return (
    <>
      <Script
        src="https://app.lemonsqueezy.com/js/lemon.js"
        strategy="lazyOnload"
      ></Script>
      <h1>Hello, Cool Page!</h1>
      <p>
        <a
          className="lemonsqueezy-button"
          href="https://bryan-neon.lemonsqueezy.com/buy/902336be-4f2e-457d-84c7-14ac29495d4e"
        >
          Buy My Amazing Product
        </a>
      </p>
    </>
  );
}
