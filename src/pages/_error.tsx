import { Notifier } from "@airbrake/browser";
// import { NextPageContext } from "next";

// interface Props {
//   statusCode?: number;
// }

// const Error: React.FC<Props> = ({ statusCode }) => {
//   return (
//     <p>
//       {statusCode
//         ? `An error ${statusCode} occurred on server`
//         : "An error occurred on client"}
//     </p>
//   );
// };

// export const getInitialProps = (props: NextPageContext): Props => {
//   const { res, err } = props;
//   console.log(props);
//   const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
//   return { statusCode };
// };

// export default Error;

// import { NextPage } from 'next'

// interface Props {
//   userAgent?: string;
// }

// const Page: NextPage<Props> = ({ userAgent }) => (
//   <main>Your user agent: {userAgent}</main>
// )

// Page.getInitialProps = async ({ req }) => {
//   const userAgent = req ? req.headers['user-agent'] : navigator.userAgent
//   return { userAgent }
// }

// export default Page

import React from "react";
import NextError from "next/error";
import { useRouter } from "next/router";

const Error: Pick<typeof NextError, "getInitialProps"> = (props: any) => {
  const { statusCode } = props;
  return (
    <>
      <p>
        {statusCode
          ? `An error ${statusCode} occurred on server`
          : "An error occurred on client"}
      </p>
      <pre>{JSON.stringify(props)}</pre>
    </>
  );
};

Error.getInitialProps = async ({ req, res, err, ...props }) => {
  const errorInitialProps = await NextError.getInitialProps({
    req,
    res,
    err,
    ...props,
  });

  console.log(errorInitialProps);
  // Running on the server, the response object (`res`) is available.
  //
  // Next.js will pass an err on the server if a page's data fetching methods
  // threw or returned a Promise that rejected
  //
  // Running on the client (browser), Next.js will provide an err if:
  //
  //  - a page's `getInitialProps` threw or returned a Promise that rejected
  //  - an exception was thrown somewhere in the React lifecycle (render,
  //    componentDidMount, etc) that was caught by Next.js's React Error
  //    Boundary
  if (res?.statusCode === 404) {
    // Do not record an exception for 404
    return { statusCode: 404 };
  }

  if (err) {
    const airbrake = new Notifier({
      projectId: 482785,
      projectKey: "ca5f81794d6c0ac39e4e368e6416d9f0",
    });

    console.log("keys: ", Object.keys(err));
    console.log("err: ", err);
    airbrake.notify({
      error: "err",
      params: JSON.stringify(err),
    });

    return errorInitialProps;
  }

  // If this point is reached, getInitialProps was called without any
  // information about what the error might be. This is unexpected and may
  // indicate a bug introduced in Next.js, so record it
  // req.winstonInstance.error(
  //   `_error.tsx getInitialProps missing data at path: ${props.asPath}`
  // );

  return errorInitialProps;
};

export default Error;
