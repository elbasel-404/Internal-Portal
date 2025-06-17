"use server"

import { InitialState } from "@components/modals/HomePageSettingsModal/ToggleForm"
import { db } from "@db"
import { homePageSlotsKeys } from "@lib"
import {
  validateGeneralInfoKey,
  validateHomePageSlotKey,
  validateNewsTabsKey,
} from "../db/validation"
import { getUser } from "../db/actions/getUser"
import { z } from "zod"
// import { redirect } from 'next/navigation';

export const toggleHomePageSetting = async (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  prevState: any,
  formData: FormData,
): Promise<InitialState> => {
  const state: InitialState = {
    // active: false,
    key: "",
    type: "",
    userId: -1,
    error: "",
  }

  const userIdString = formData.get("userId")?.toString()
  if (!userIdString) {
    state.error = "User ID not found"
    return state
  }

  const userId = parseInt(userIdString)
  if (isNaN(userId)) {
    state.error = "Invalid user ID"
    return state
  }

  const slotKey = formData.get("slotKey")?.toString()
  if (!slotKey) {
    state.error = "No slot key provided"
    return state
  }

  const slotType = formData.get("slotType")?.toString()
  if (!slotType) {
    state.error = "No slot type provided"
    return state
  }
  const slotTypeSchema = z.enum(["homePage", "generalInfo", "news"])
  const slotTypeValidation = slotTypeSchema.safeParse(slotType)
  if (!slotTypeValidation.success) {
    state.error = "Invalid slot type"
    return state
  }

  // const active = formData.get("active")?.toString();
  // if (!active) {
  //   state.error = "No active status provided";
  //   return state;
  // }

  state.key = slotKey
  state.type = slotType
  state.userId = userId

  await db.read()
  const userIndex = db.data.users.findIndex(({ id }) => id === userId)
  if (userIndex === -1) {
    state.error = "Invalid UserId"
    return state
  }

  const toggleHomePageSlot = async (state: InitialState) => {
    const validatedKey = await validateHomePageSlotKey(slotKey)
    if (!validatedKey) return

    const user = await getUser(userId)
    if (!user) {
      state.error = "User not found"
      return state
    }

    const activeHomePageSlotsKeys = user.activeHomePageSlotsKeys
    const isAlreadyActive = activeHomePageSlotsKeys.includes(validatedKey)

    if (isAlreadyActive) {
      const filteredKeys = activeHomePageSlotsKeys.filter(
        (k) => k !== validatedKey,
      )
      db.data.users[userIndex].activeHomePageSlotsKeys = filteredKeys
      // state.active = false;
    } else {
      // state.active = true;
      const defaultIndex = homePageSlotsKeys.indexOf(validatedKey)
      db.data.users[userIndex].activeHomePageSlotsKeys.splice(
        defaultIndex,
        0,
        validatedKey,
      )
    }
    await db.write()
  }

  const toggleGeneralInfo = async (state: InitialState) => {
    const validatedKey = await validateGeneralInfoKey(slotKey)
    if (!validatedKey) return
    const user = await getUser(userId)
    if (!user) {
      state.error = "User not found"
      return state
    }
    const activeGeneralInfoKeys = user.activeGeneralInfoKeys

    const isAlreadyActive = activeGeneralInfoKeys.includes(validatedKey)

    if (isAlreadyActive) {
      const filteredKeys = activeGeneralInfoKeys.filter(
        (k) => k !== validatedKey,
      )
      // state.active = false;
      db.data.users[userIndex].activeGeneralInfoKeys = filteredKeys
      await db.write()
      return state
    }

    if (!isAlreadyActive && activeGeneralInfoKeys.length < 6) {
      // state.active = true;
      db.data.users[userIndex].activeGeneralInfoKeys.push(validatedKey)
      await db.write()
      return state
    }

    if (!isAlreadyActive && activeGeneralInfoKeys.length >= 6) {
      state.error = "You can only have 6 active general info slots"
      return state
    }
  }

  const toggleNewsTabs = async () => {
    const validatedKey = await validateNewsTabsKey(slotKey)
    if (!validatedKey) return
    const user = await getUser(userId)
    const activeNewsTabsKeys = user.activeNewsTabsKeys
    const isAlreadyActive = activeNewsTabsKeys.includes(validatedKey)

    if (isAlreadyActive) {
      // state.active = false;
      const filteredKeys = activeNewsTabsKeys.filter((k) => k !== validatedKey)
      db.data.users[userIndex].activeNewsTabsKeys = filteredKeys
    } else {
      // state.active = true;
      db.data.users[userIndex].activeNewsTabsKeys.push(validatedKey)
    }
    await db.write()
  }

  // setTimeout(async () => {
  if (slotType === "homePage") await toggleHomePageSlot(state)
  if (slotType === "generalInfo") await toggleGeneralInfo(state)
  if (slotType === "news") await toggleNewsTabs()
  // }, 0);

  return state
}
