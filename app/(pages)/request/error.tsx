"use client";

import { useSetAtom } from "jotai";
// import { useEffect, useState } from "react";
// import { getDemo } from "../../db/actions/getDemo";
// import { useAtomValue, useSetAtom } from "jotai";
// import { demoAtom } from "../../atoms/demoAtom";
// import { shouldRefreshAtom } from "../../atoms/shouldRefreshAtom";
import { apiErrorAtom } from "../../atoms/apiErrorAtom";
import { useEffect } from "react";

interface ErrorProps {
  error: Error;
}

const ApiError = ({ error }: ErrorProps) => {
  const setApiErrorAtom = useSetAtom(apiErrorAtom);

  useEffect(() => {
    setApiErrorAtom(error);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  return (
    <div>
      <h1>Api Error</h1>
      <pre dir="rtl">
        {typeof error.cause === "string" ? error.cause : "Unknown error"}
      </pre>
      <pre dir="rtl">
        {typeof error.message === "string" ? error.message : "Unknown error"}
      </pre>
      <pre dir="rtl">
        {typeof error.name === "string" ? error.name : "Unknown error"}
      </pre>
      <pre>
        {typeof error.cause === "string" ? error.cause : "Unknown error"}
      </pre>
      <pre>
        {typeof error.message === "string" ? error.message : "Unknown error"}
      </pre>
      <pre>{typeof error.name === "string" ? error.name : "Unknown error"}</pre>
      <pre>
        {typeof error.stack === "string"
          ? error.stack
          : "No stack trace available"}
      </pre>
    </div>
  );
};

export default ApiError;
