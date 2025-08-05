import dynamic from "next/dynamic"
const ReactJsonView = dynamic(() => import("@microlink/react-json-view"), {
  ssr: false,
})

export const Output = ({ json = {} }) => {
  return (
    <ReactJsonView
      theme="shapeshifter"
      src={json}
      //   src={{
      // string: "this is a test string",
      // integer: 42,
      // array: [1, 2, 3, "test", NaN],
      // float: 3.14159,
      // undefined: undefined,
      // object: {
      //   "first-child": true,
      //   "second-child": false,
      //   "last-child": null,
      // },
      // string_number: "1234",
      // date: new Date(),
      //   }}
    />
  )
}
