import React from "react";
import { GetServerSidePropsContext } from "next";
import axios from "axios";

declare global {
  interface Window {
    dataLayer: any[];
  }
}

interface ICatFacts {
  catFacts: any;
  error: any;
  test: any;
}

const CatFacts: React.FC<ICatFacts> = ({ catFacts, test }) => {
  if (test === "undefined") {
    // throw new Error("hah");
  }
  const event = {
    event: "Custom Event",
    eventCategory: "category",
    eventAction: "action",
    eventLabel: "label",
    eventValue: "value",
  };
  if (
    typeof window !== "undefined" &&
    typeof window.dataLayer !== "undefined"
  ) {
    window.dataLayer.push(event);
  }

  React.useEffect(() => {
    if (typeof window == "undefined") {
    }
  }, []);

  return (
    <div>
      <h1>CatFacts</h1>
      <br />
      <p>{catFacts?.fact}</p>
      <br />
      <br />
      <p>{test}</p>
    </div>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  let data;
  const res = await axios.get("https://catfact.ninja/fac t");
  try {
    const res = await axios.get("https://catfact.ninja/fac t");
    data = res.data;
  } catch (err) {
    console.log(err);
  }

  const test = typeof window;

  return {
    props: {
      catFacts: data,
      test,
    },
  };
}

export default CatFacts;
