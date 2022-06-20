import type { AppProps } from "next/app";
import Head from "next/head";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <title>Drag and Drop</title>
                <meta name="description" content="Drag and Drop" />
                <link rel="icon" href="/favicon.ico" />

                <meta
                    property="og:url"
                    content="https://react-drag-and-drop-samiulalimsaad.vercel.app/"
                />
                <meta property="og:type" content="website" />
                <meta property="og:title" content="React Drag And Drop" />
                <meta
                    property="og:description"
                    content="React Drag and Drop game for equation solver. Drag and Drop blocks and enter your guess number, compare it WIN!!"
                />
                <meta property="og:image" content="/public/Drag-and-Drop.png" />
            </Head>
            <Component {...pageProps} />
        </>
    );
}

export default MyApp;
