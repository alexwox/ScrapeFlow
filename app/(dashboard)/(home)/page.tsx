import { GetPeriods } from "@/actions/analytics/getPeriods";
import React, { Suspense } from "react";
import PeriodSelector from "./_components/PeriodSelector";
import { Period } from "@/types/analytics";
import { Skeleton } from "@/components/ui/skeleton";

function HomePage({
  searchParams,
}: {
  searchParams: {
    month?: string;
    year?: string;
  };
}) {
  const currentDate = new Date();
  const { month, year } = searchParams;
  const period: Period = {
    month: month ? parseInt(month) : currentDate.getMonth(),
    year: year ? parseInt(year) : currentDate.getFullYear(),
  };
  return (
    <div>
      {JSON.stringify(period)}
      <Suspense fallback={<Skeleton className="w-[180px]" />}>
        <PeriodSelectorWrapper selectedPeriod={period}></PeriodSelectorWrapper>
      </Suspense>
    </div>
  );
}

async function PeriodSelectorWrapper({
  selectedPeriod,
}: {
  selectedPeriod: Period;
}) {
  const periods = await GetPeriods();
  return (
    <PeriodSelector
      selectedPeriod={selectedPeriod}
      periods={periods}
    ></PeriodSelector>
  );
}
export default HomePage;
