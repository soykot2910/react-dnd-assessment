import React, { useRef, useState } from "react";
import { useDrag } from "react-dnd";
import { ROW } from "../utils/constants";
import DropZone from "./DropZone";
import Column from "./Column";
import Split from "react-split";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const style = {};
const Row = ({ data, components, handleDrop, path }) => {
  const [showModal, setShowModal] = useState(false);

  const ref = useRef(null);
  const [{ isDragging }, drag] = useDrag({
    item: {
      type: ROW,
      id: data.id,
      children: data.children,
      path,
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;
  drag(ref);

  const renderColumn = (column, currentPath) => {
    return (
      <Column
        key={column.id}
        data={column}
        components={components}
        handleDrop={handleDrop}
        path={currentPath}
      />
    );
  };

  const handleToggle = () => {
    setShowModal(!showModal);
  };

  return (
    <div
      ref={ref}
      // onClick={handleToggle}
      style={{ ...style, opacity }}
      className="base draggable row"
    >
      {data.id}
      <Split direction="vertical">
        <Split className="wrapper">
          {data.children.map((column, index) => {
            const currentPath = `${path}-${index}`;
            return (
              <div key={column.id}>
                <DropZone
                  data={{
                    path: currentPath,
                    childrenCount: data.children.length,
                  }}
                  onDrop={handleDrop}
                  className="horizontalDrag"
                />
                {renderColumn(column, currentPath)}
              </div>
            );
          })}
          <DropZone
            data={{
              path: `${path}-${data.children.length}`,
              childrenCount: data.children.length,
            }}
            onDrop={handleDrop}
            className="horizontalDrag"
            isLast
          />
          
        </Split>
      </Split>

      <Modal
        isOpen={showModal}
        onRequestClose={handleToggle}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h3>Item id: {data.id}</h3>
      </Modal>
    </div>
  );
};
export default Row;
