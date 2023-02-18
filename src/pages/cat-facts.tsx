import React from "react";
import { GetServerSidePropsContext } from "next";
import axios from "axios";

interface ICatFacts {
  catFacts: any;
  error: any;
}

const CatFacts: React.FC<ICatFacts> = ({ catFacts }) => {
  return (
    <div>
      <h1>CatFacts</h1>
      <br />
      <p>{catFacts?.fact}</p>
    </div>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  let data;
  try {
    const res = await axios.get("https://catfact.ninja/fact");
    data = res.data;
  } catch (err) {
    console.log(err);
  }

  return {
    props: {
      catFacts: data,
    },
  };
}

export default CatFacts;
