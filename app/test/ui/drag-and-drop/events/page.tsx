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
      },

      onDragend: () => {
        // setDragStatus('Not dragging');
        // setValuesChanged('Not sorting');
      },

      onSort: () => {
        // Event parameter not used
        // setValuesChanged(`${event.previousValues} -> ${event.values}`);
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
