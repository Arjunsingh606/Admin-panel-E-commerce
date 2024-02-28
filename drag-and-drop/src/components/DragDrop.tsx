import React from "react";

interface DragDropProps {
  handleFiles: (files: File[]) => void;
}

const DragDrop: React.FC<DragDropProps> = ({ handleFiles }) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      handleFiles(Array.from(files));
    }
  };
  
  return (
    <section>
      <div className="dropzone">
        <input type="file" accept="image/*" multiple onChange={handleFileChange} className="drag-input" />
      </div>
    </section>
  );
};

export default DragDrop;
