"use client";

import { costsAtom, dateFromAtom, dateToAtom } from "@atoms";
import { InputField, SelectField } from "@components/form";
import { CheckIcon, RiyalCurrencyIcon, XMarkIcon } from "@icons";
import { Button } from "@ui";
import { useLocalStorage } from "@uidotdev/usehooks";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { toast } from "sonner";
import { deputationPlaceFormAction } from "./DeputationPlaceFormAction";

export const DeputationPlaceForm = () => {
  const router = useRouter();
  const [place, setPlace] = useState("");
  const [city, setCity] = useState("");
  const closeModal = () => {
    router.back();
  };

  const handleDeputationPlaceChange = (value: string) => {
    setPlace(value);
    setCity("");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    closeModal();
  };

  return (
    <form
      action={deputationPlaceFormAction}
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 px-4 mt-4"
    >
      <SelectField
        name="place"
        label="البلاد"
        placeholder="__"
        types={[
          { id: "2", name: "مصر" }, // Egypt
          { id: "3", name: "المغرب" }, // Morocco
          { id: "4", name: "تونس" }, // Tunisia
          { id: "5", name: "الجزائر" }, // Algeria
          { id: "6", name: "العراق" }, // Iraq
          { id: "7", name: "سوريا" }, // Syria
          { id: "8", name: "السودان" }, // Sudan
          { id: "9", name: "عُمان" }, // Oman
          { id: "10", name: "قطر" },
        ]}
        value={place}
        onChange={handleDeputationPlaceChange}
      />
      <InputField
        name="city"
        label="المدينة"
        placeholder=""
        required
        value={city}
      />
      <div className="flex justify-end mb-2 gap-2">
        <Button
          onClick={closeModal}
          type="button"
          className="flex items-center gap-1 bg-[#DEE5ED] text-stormGray shadow-none hover:bg-gray-300 rounded-xl p-4"
        >
          <XMarkIcon className="fill-stormGray w-0 h-0" />
          إغلاق
        </Button>

        <Button
          className="flex items-center gap-1 bg-primary-opacity group text-primary shadow-none hover:bg-primary hover:text-white rounded-xl p-4"
          type="submit"
        >
          <CheckIcon className="fill-primary group-hover:fill-white" />
          إضافة
        </Button>
      </div>
    </form>
  );
};
