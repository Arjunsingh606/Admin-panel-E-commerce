import React, { useState } from "react";
import { Image, Button, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import "../styles/gallary.css";
import Preview from "./Preview";
import { ImageFile, PreviewImage } from "../interFace/ImageFileInterFace";

interface ImageProps {
  images: ImageFile[];
  preview: PreviewImage[];
  handleDeleteImage: (index: number) => void;
  onCheckChange: (imageId: string) => void;
  checkedImages: string[];
}

const Gallery: React.FC<ImageProps> = ({ images, preview, handleDeleteImage, onCheckChange, checkedImages, }) => {
  const [selectedImages, setSelectedImages] = useState<string[]>([]);

  const toggleImageSelection = (imageId: string) => {
    const isSelected = selectedImages.includes(imageId);

    if (isSelected) {
      setSelectedImages((prevSelected) =>
        prevSelected.filter((id) => id !== imageId)
      );
    } else {
      setSelectedImages((prevSelected) => [...prevSelected, imageId]);
    }
  };

  return (
    <>
      <div className="gallery">
        {images &&
          images.map((item: any, index: number) => (
            <div className="image-item" key={item.id}>
              <div className={`uploaded-img ${selectedImages.includes(item.id || "") ? "selected" : ""}`} >
                <Image src={item?.image} alt="Uploading.." className="img-fluid" />
                <div className="hover-content">
                  <div className="hover-item">
                    {checkedImages.length === 0 ? <div className="checked-option"> <Form.Check
                      checked={selectedImages.includes(item.id || "")}
                      onChange={() => {
                        onCheckChange(item.id);
                        toggleImageSelection(item.id || "");
                      }}
                    />
                      <Button variant="primary" className="delete-icon" onClick={() => handleDeleteImage(index)} >
                        <FontAwesomeIcon icon={faTrash} />
                      </Button></div> : <Form.Check
                      checked={selectedImages.includes(item.id || "")}
                      className="check-input"
                      onChange={() => {
                        onCheckChange(item.id);
                        toggleImageSelection(item.id || "");
                      }}
                    />
                    }
                  </div>
                  <div className="preview-button">
                    <Preview images={images} preview={preview} id={item.id} />
                  </div>
                </div>
              </div>
              <p>{item.name}</p>
            </div>
          ))}
      </div>
      {images.length === 0 && (
        <h4 className="empty-list">Image does not found !!!</h4>
      )}
    </>
  );
};

export default Gallery;
