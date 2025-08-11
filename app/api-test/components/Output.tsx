// import dynamic from "next/dynamic"
// const ReactJsonView = dynamic(() => import("@microlink/react-json-view"), {
//   ssr: false,
// })
import { githubDarkTheme } from "@uiw/react-json-view/githubDark"
import JsonView from "@uiw/react-json-view"

export const Output = ({ json = {} }) => {
  return (
    <JsonView
      collapsed={true}
      className="!text-2xl"
      value={json}
      style={githubDarkTheme}
    />
  )
}
