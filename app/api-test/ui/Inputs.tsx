"use client"

import { InputData } from "../types/InputData"
import { TextInput } from "../TextInput"
import { PlusIcon, Trash2Icon } from "lucide-react"
import { useLocalStorage } from "usehooks-ts"
import { Animate } from "@components"
import { MouseEvent } from "react"

export interface Inputs {
  enteries: InputData[]
  keyPrefix: string
  showPlusIcon: boolean
}

export const Inputs = ({
  enteries: headersList,
  keyPrefix,
  showPlusIcon,
}: Inputs) => {
  const [extraInputs, setExtraInputs] = useLocalStorage<number[]>(
    `extraInputs-${keyPrefix}`,
    [],
  )

  return (
    <div dir="ltr" className="mt-4 space-y-4">
      {headersList.map(({ key, value }) => (
        <div dir="ltr" key={key}>
          <div dir="ltr" className="flex flex-col gap-2 md:flex-row md:gap-0">
            <p
              dir="ltr"
              className="flex w-full text-red-600 md:w-1/4 md:items-center md:justify-center "
            >
              {key}
            </p>
            <TextInput name={keyPrefix + "-" + key} defaultValue={value} />
          </div>
        </div>
      ))}
      <ExtraInputs
        keyPrefix={keyPrefix}
        onDelete={(index) =>
          setExtraInputs((prev) => prev.filter((i) => i !== index))
        }
        extraInputs={extraInputs}
      />

      {showPlusIcon && (
        <button
          title="button"
          type="button"
          onClick={() => {
            setExtraInputs((prev) => [...prev, prev.length + 1])
          }}
          className="flex items-center justify-center w-full px-4 py-2 transition-colors border cursor-pointer boorder-white/50 rounded-xl hover:bg-white hover:text-black hover:ring-1 hover:ring-black"
        >
          <PlusIcon />
        </button>
      )}
    </div>
  )
}

const ExtraInputs = ({
  keyPrefix,
  extraInputs,
  onDelete,
}: {
  extraInputs: number[]
  onDelete: (index: number) => void
  keyPrefix: string
}) => {
  const handleDeleteInput = (
    e: MouseEvent<HTMLButtonElement>,
    index: number,
  ) => {
    const element = e.currentTarget
    const levelOneParent = element.parentElement
    const levelTwoParent = levelOneParent?.parentElement
    levelTwoParent?.remove()
    onDelete(index)
  }
  return (
    <Animate dir="ltr" className="space-y-4">
      {extraInputs.map((index) => {
        return (
          <EInput
            keyPrefix={keyPrefix}
            key={keyPrefix + index}
            index={index}
            handleDeleteInput={handleDeleteInput}
          />
        )
      })}
    </Animate>
  )
}

interface EInputProps {
  index: number
  handleDeleteInput: (e: MouseEvent<HTMLButtonElement>, index: number) => void
  keyPrefix: string
}

const EInput = ({ index, handleDeleteInput, keyPrefix }: EInputProps) => {
  const [textInputName, setTextInputName] = useLocalStorage<string>(
    "input-name-" + keyPrefix + index,
    "",
  )
  // const [inputNameValue, setInputNameValue] = useLocalStorage<string>(
  //   "input-name-vlaue" + keyPrefix + index,
  //   "",
  // )

  return (
    <div dir="ltr" className="flex flex-col justify-center gap-2">
      <input
        defaultValue={keyPrefix + "-" + textInputName}
        onChange={(e) => setTextInputName(e.target.value)}
        dir="ltr"
        placeholder="Enter name"
        type="text"
        className="bg-red-600 w-1/3 text-white block px-4 py-2 rounded-xl text-lg focus:ring-1 ring-[#1e40af]"
      />
      <div className="flex items-center gap-2">
        <TextInput
          name={keyPrefix + "-" + textInputName}
          dir="ltr"
          placeholder="Enter value"
        />
        <button
          type="button"
          title="button"
          onClick={(e) => handleDeleteInput(e, index)}
        >
          <Trash2Icon className="text-red-600" />
        </button>
      </div>
    </div>
  )
}
