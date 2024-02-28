import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import DragDrop from "./DragDrop";

interface ModalProps {
  show: boolean;
  handleClose: () => void;
  getData: () => void
}

const AddImage: React.FC<ModalProps> = ({ show, handleClose, getData }) => {
  const [selectedImages, setSelectedImages] = useState<File[]>([]);

  const handleFiles = (files: any) => {
    setSelectedImages((prevImages) => [...prevImages, ...files]);
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const baseFile = reader.result as string;
        if (baseFile) {
          resolve(baseFile);
        } else {
          reject("Error converting file to base64");
        }
      };
      reader.onerror = (error) => reject(error);
    });
  };

  const handleUpload = async () => {

    let baseFile;
    for (const file of selectedImages) {
      let formData: any = {};
      baseFile = await fileToBase64(file);
      formData.name = file?.name;
      formData.size = file?.size;
      formData.lastModified = file?.lastModified;
      formData.type = file?.type;
      formData.webkitRelativePath = file?.webkitRelativePath;
      formData.image = baseFile;

      try {
        const response = await fetch("http://localhost:3001/images", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        if (response.ok) {
          setSelectedImages([]);
        }
      } catch (error) {
        console.error("Error uploading images", error);
      }
    }
    getData()
    handleClose();
  };

  const modifiedTime = selectedImages.map((file: File) => {
    const modifiedDate = new Date(file.lastModified);
    return modifiedDate.toLocaleString();
  });

  const handleDeleteImage = (index: number) => {
    const updatedImages = [...selectedImages];
    updatedImages.splice(index, 1);
    setSelectedImages(updatedImages);
  };

  const handleResetInputModal=()=>{
    setSelectedImages([])
    handleClose()
  }

  return (
    <Modal show={show} onHide={handleResetInputModal} className="drag-drop-modal">
      <Modal.Header closeButton>
        <Modal.Title>Upload Images</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <DragDrop handleFiles={handleFiles} />
        <ul className="image-list">
          {selectedImages.map((file: File, index: number) => {
            return (
              <li key={index}>
                <div className="selected-image">
                  <div className="drag-img">
                    <img
                      src={URL.createObjectURL(file)}
                      alt={file.name}
                      className="img-fluid list-img"
                    />
                  </div>
                  <div className="drag-img-details">
                    <div>{file.name}</div>
                    <div className="image-detail">
                      <p>Size: {(file.size / 1024).toFixed(2)} KB</p>
                      <p>Modified Time: {modifiedTime[index]}</p>
                    </div>
                    <button
                      className="delete-btn"
                      onClick={() => handleDeleteImage(index)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
        <Button variant="primary" className="upload-btn" onClick={handleUpload}>
          Upload
        </Button>
      </Modal.Body>
    </Modal>
  );
};

export default AddImage;
