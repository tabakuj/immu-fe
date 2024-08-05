'use client'
import styles from "./page.module.css";
import {AuthorsListComponent} from "@/app/components/accounts/AccountList";

export default function Home() {
  return (
    <main className={styles.main}>
      <AuthorsListComponent/>
    </main>
  );
}
