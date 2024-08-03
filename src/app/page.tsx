'use client'
import styles from "./page.module.css";
import {AuthorsListComponent} from "@/app/components/accounts/accountList";

export default function Home() {
  return (
    <main className={styles.main}>
      <AuthorsListComponent/>
    </main>
  );
}
