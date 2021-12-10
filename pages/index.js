import React from "react";
import Head from "next/head";
import Toolkit from "../components/Toolkit";
import Workspace from "../components/Workspace";
import styles from "../styles/Home.module.scss";
import { useSelector } from "react-redux";
import ImageForm from "../components/toolkitChildren/ImageForm";

export default function Home() {
  const showImageForm = useSelector((state) => state.poster.showImageForm);

  return (
    <div className={styles.container}>
      <Head>
        <title>Yuria Movie Poster Generator</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {showImageForm ? <ImageForm /> : null}
      <Toolkit />
      <Workspace className={styles.workspace} />
    </div>
  );
}
