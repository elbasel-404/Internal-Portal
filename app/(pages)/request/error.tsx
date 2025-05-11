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
    </div>
  );
};

export default ApiError;
