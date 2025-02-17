import React from "react";

function HomePage() {
  return <div>Hello World</div>;
}

async function PeriodSelectorWrapper() {
  const period = await GetPeriods();
  return <pre className="">{JSON.stringify(period, null, 4)}</pre>;
}
export default HomePage;
