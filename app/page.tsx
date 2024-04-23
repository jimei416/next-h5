"use client"; // this is a client component
import Image from "next/image";
import styles from "./page.module.scss";
import Login from "@/page/login";
import { useState } from "react";
import Org from "@/page/org";

export default function Home() {
  const [flag, setFlag] = useState(false);
  return (
    <main className={styles.main}>
      {flag ? <Org /> : <Login setFlag={() => setFlag(true)} />}
    </main>
  );
}
