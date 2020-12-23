import Head from "next/head";
import { Calendar } from "../components/Calendar";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Calendar />
    </div>
  );
}
