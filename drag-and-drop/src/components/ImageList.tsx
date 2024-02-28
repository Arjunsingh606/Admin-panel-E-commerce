import React from "react";
import { Table, Form, Button } from "react-bootstrap";
import Preview from "./Preview";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { ImageFile, PreviewImage } from "../interFace/ImageFileInterFace";

interface ImageProps {
  images: ImageFile[];
  preview: PreviewImage[];
  setImages: (value: any) => void;
  handleDeleteImage: (id: number) => void;
  onCheckChange: (imageId: string) => void;
  checkedImages: string[];
  handleAllCheck: () => void;
}

const ImageList: React.FC<ImageProps> = ({ images, preview, checkedImages, handleDeleteImage, onCheckChange, handleAllCheck }) => {
  const modifiedTime = images.map((item) => {
    const lastModifiedTime = item.lastModified;
    const modifiedDate = new Date(lastModifiedTime);
    return modifiedDate.toLocaleString();
  });

  return (
    <div>
      <Table striped hover responsive>
        <thead>
          <tr className="table-heading">
            <th className="all-select-checkbox">
              <Form.Check
                type="checkbox"
                onChange={() => handleAllCheck()}
              />
              Name
            </th>
            <th>File size</th>
            <th>Modified date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {images &&
            images.map((image: any, index: number) => {
              return (
                <tr key={index} className="table-data">
                  <td>
                    <div className="image-list-item">
                      <Form.Check
                        type="checkbox"
                        checked={checkedImages.includes(image.id)}
                        onChange={() => onCheckChange(image.id)}
                      />
                      <div className="list-images">
                        <img src={image.image} alt="loading" />
                      </div>
                      <div> {image.name}</div>
                    </div>
                  </td>
                  <td>{(image.size / 1024).toFixed(2)} KB</td>
                  <td>{modifiedTime[index]}</td>
                  <td>
                    <div className="actions-list">
                      {checkedImages.length === 0 && (
                        <div>
                          <Button
                            variant="primary"
                            className="delete-icon"
                            onClick={() => handleDeleteImage(index)}
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </Button>
                        </div>
                      )}
                      <Preview images={images} preview={preview} id={image.id} />
                    </div>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
      {images.length === 0 && (
        <h4 className="empty-list">Image does not found !!!</h4>
      )}
    </div>
  );
};

export default ImageList;
