"use client"

// import { useState } from 'react';
import { useDragAndDrop } from "@formkit/drag-and-drop/react"

const DragAndDropEventsTestPage = () => {
  //   const [dragStatus, setDragStatus] = useState('Not dragging');
  //   const [valuesChanged, setValuesChanged] = useState('Not sorting');

  const [parent, items] = useDragAndDrop<HTMLUListElement, string>(
    ["🍦 vanilla", "🍫 chocolate", "🍓 strawberry"],
    {
      onDragstart: () => {
        // setDragStatus('Dragging');
        // console.log('dragging');
      },

      onDragend: () => {
        // setDragStatus('Not dragging');
        // console.log('not dragging');
        // setValuesChanged('Not sorting');
        // console.log('not sorting');
      },

      onSort: (event) => {
        // setValuesChanged(`${event.previousValues} -> ${event.values}`);
        console.log("sorting")
        console.log({
          previousValues: event.previousValues,
          values: event.values,
          draggedNode: event.draggedNode,
          nodes: event.nodes,
          position: event.position,
          previousPosition: event.previousPosition,
          previousNode: event.previousNodes,
          parent: event.parent,
        })
      },
    },
  )

  return (
    <div>
      <strong>Rank your favorite flavors</strong>
      <br />
      {/* <span>{dragStatus}</span> */}
      {/* <span>{valuesChanged}</span> */}
      <br />
      <ul ref={parent}>
        {items.map((item) => {
          return <li key={item}>{item}</li>
        })}
      </ul>
    </div>
  )
}

export default DragAndDropEventsTestPage
