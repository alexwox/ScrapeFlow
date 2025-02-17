import { GetPeriods } from "@/actions/analytics/getPeriods";
import { Suspense } from "react";
import PeriodSelector from "./_components/PeriodSelector";
import { Period } from "@/types/analytics";
import { Skeleton } from "@/components/ui/skeleton";
import { waitFor } from "@/lib/helper/waitFor";
import { GetStatsCardsValues } from "@/actions/analytics/getStatsCardsValues";
import React from "react";

export default function HomePage({
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
    <div className="flex flex-1 flex-col h-full">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold">Home</h1>
        <Suspense fallback={<Skeleton className="w-[180px] h-[40px]" />}>
          <PeriodSelectorWrapper
            selectedPeriod={period}
          ></PeriodSelectorWrapper>
        </Suspense>
      </div>
      <StatsCards selectedPeriod={period} />
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

async function StatsCards({ selectedPeriod }: { selectedPeriod: Period }) {
  const data = await GetStatsCardsValues(selectedPeriod);
  return <pre className="">{JSON.stringify(data, null, 4)}</pre>;
}
