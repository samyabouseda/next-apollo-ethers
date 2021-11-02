import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { Wallet } from "../components/Wallet";
import ClientOnly from "../components/ClientOnly";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Floki City - Ticket Office</title>
        <meta
          name="description"
          content="The lottery ticket office of Floki City"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://floki.city">Floki City</a> ticket office!
        </h1>

        <div className={styles.description}>
          <ClientOnly>
            <Wallet />
          </ClientOnly>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by Zaap, enginneer
        </a>
      </footer>
    </div>
  );
}
