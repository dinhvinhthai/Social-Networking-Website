import React, { useEffect } from "react";

function Test() {
  useEffect(() => {
    console.log("2");
  }, []);
  return <div>Test</div>;
}

export default Test;
