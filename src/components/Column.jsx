import React, { useRef, useState } from "react";
import { useDrag } from "react-dnd";
import { COLUMN } from "../utils/constants";
import DropZone from "./DropZone";
import Component from "./Component";
import { customStyles } from "../utils/customeStyle";
import Modal from "react-modal";

const style = {};
const Column = ({ data, components, handleDrop, path }) => {
  const [showModal, setShowModal] = useState(false);
  const ref = useRef(null);

  const [{ isDragging }, drag] = useDrag({
    item: {
      type: COLUMN,
      id: data.id,
      children: data.children,
      path,
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const handleToggle = (e) => {
    console.log(e);
    setShowModal(!showModal);
  };

  const opacity = isDragging ? 0 : 1;
  drag(ref);

  const renderComponent = (component, currentPath) => {
    return (
      <Component
        key={component.id}
        data={component}
        components={components}
        path={currentPath}
      />
    );
  };

  return (
    <>
      <div
        ref={ref}
        onClick={(e) => handleToggle(e)}
        style={{ ...style, opacity }}
        className="base draggable column"
      >
        {data.id}
        {data.children.map((component, index) => {
          const currentPath = `${path}-${index}`;

          return (
            <div key={component.id}>
              <DropZone
                data={{
                  path: currentPath,
                  childrenCount: data.children.length,
                }}
                onDrop={handleDrop}
              />
              {renderComponent(component, currentPath)}
            </div>
          );
        })}
        <DropZone
          data={{
            path: `${path}-${data.children.length}`,
            childrenCount: data.children.length,
          }}
          onDrop={handleDrop}
          isLast
        />
      </div>

      <Modal
        isOpen={showModal}
        onRequestClose={handleToggle}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h3>Item id: {data.id}</h3>
      </Modal>
    </>
  );
};
export default Column;
