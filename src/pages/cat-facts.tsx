import React from "react";
import { GetServerSidePropsContext } from "next";
import axios from "axios";

import TestChart from "@/components/chart/test-chart";
import dynamic from "next/dynamic";

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

const PreRegAnalytics = dynamic(() => import("@/components/chart/test-chart"), {
  ssr: false,
});

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
    window.console.log("hello mello");
    setTimeout(() => {
      // throw Error("lol");
    }, 1000);
  }, []);

  return (
    <div>
      <h1>CatFacts</h1>
      <br />
      <p>{catFacts?.fact}</p>
      <br />
      <br />
      <p>{test}</p>

      <TestChart catFacts />
      <PreRegAnalytics catFacts />
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

  const test = typeof window;

  return {
    props: {
      catFacts: data,
      test,
    },
  };
}

export default CatFacts;
