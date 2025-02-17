"use client";

import { Period } from "@/types/analytics";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;

function PeriodSelector({ periods }: { periods: Period[] }) {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {periods.map((period, index) => (
          <SelectItem key={index} value={`${period.month}-${period.year}`}>{`${
            MONTH_NAMES[period.month]
          } ${period.year}`}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default PeriodSelector;
