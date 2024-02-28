import React, { useState, useEffect } from "react";
import { Row, Col, Tab, Nav, Button, Form } from "react-bootstrap";
import "../styles/gallary.css";
import AddImage from "./AddImage";
import ImageList from "./ImageList";
import Gallary from "./Gallary";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faList,faTableCellsLarge,faTrash} from "@fortawesome/free-solid-svg-icons";
import { ImageFile, PreviewImage } from "../interFace/ImageFileInterFace";

const ImageGallary: React.FC = () => {
  const [show, setShow] = useState(false);
  const [images, setImages] = useState<ImageFile[]>([]);
  const [checkedImages, setCheckedImages] = useState<string[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  

  let preview: PreviewImage[] = [];
  const getData = async () => {
    try {
      const response = await fetch("http://localhost:3001/images");
      const imageData = await response.json();
      const filteredImages = imageData.filter((item: any) =>
        item.name.toLowerCase().includes(searchValue.toLowerCase())
      );
      setImages(filteredImages);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  useEffect(() => {
    getData();
  }, [searchValue]);

  const getImageFile = () => {
    const imageFile = images.map((item: any) =>
      preview.push({
        image: item.image,
        id: item.id,
        name: item.name,
        size: item.size,
      })
    );
    return imageFile;
  };
  getImageFile();

  const handleDeleteImage = async (index: number) => {
    try {
      const imageId = images[index].id;
      const response = await fetch(`http://localhost:3001/images/${imageId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setTimeout(() => {
          const updatedImages = images.filter((item) => item.id !== imageId);
          setImages(updatedImages);
        }, 100);
      }
    } catch (error) {
      console.error("Error deleting image", error);
    }
  };

  const handleCheckChange = (imageId: string) => {
    const updatedCheckedImages = checkedImages.includes(imageId)
      ? checkedImages.filter((id) => id !== imageId)
      : [...checkedImages, imageId];
    setCheckedImages(updatedCheckedImages);
  };

  const handleAllCheck = () => {
    const allChecked = checkedImages.length === images.length;
    const updatedCheckedImages = allChecked
      ? []
      : images.map((image) => image.id).filter((id) => id !== undefined) as string[];
    setCheckedImages(updatedCheckedImages);
  };

  const handleDeleteCheckedImages = async () => {
    images.map((item) => {
      checkedImages.map(async (image) => {
        if (image === item.id) {
          try {
            await fetch(`http://localhost:3001/images/${item.id}`, {
              method: "DELETE",
            });
            const updatedImages = images.filter(
              (item: any) => !checkedImages.includes(item.id)
            );
            setImages(updatedImages);
            setCheckedImages([]);
          } catch (error) {
            console.error("Error deleting images", error);
          }
        }
      });
    });
  };
  const handleClose = () => {setShow(false);};
  const handleShow = () => {setShow(true);};

  return (
    <Tab.Container id="left-tabs-example" defaultActiveKey="second">
      <Row className="gallary">
        <Col className="image-gallary">
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              name="search-image"
              placeholder="Search"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </Form.Group>
          <div className="gallary-items">
            <Button
              variant="primary"
              className="delete-icon"
              onClick={handleDeleteCheckedImages}
              disabled={checkedImages.length === 0}
              
            >
              <FontAwesomeIcon icon={faTrash} />
            </Button>

            <Nav variant="pills" className="list-details-btn">
              <Nav.Item>
                <Nav.Link eventKey="first" className="tabs-btn">
                  <FontAwesomeIcon icon={faList} />
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="second" className="tabs-btn">
                  <FontAwesomeIcon icon={faTableCellsLarge} />
                </Nav.Link>
              </Nav.Item>
            </Nav>
            <div>
              <Button variant="primary" onClick={handleShow}>
                Upload file
              </Button>
              <AddImage
                show={show}
                handleClose={handleClose}
                getData={getData}
              />
            </div>
          </div>
        </Col>
        <Col className="tab-content-row">
          <Tab.Content>
            <Tab.Pane eventKey="first">
              <ImageList
                images={images}
                preview={preview}
                setImages={setImages}
                handleDeleteImage={handleDeleteImage}
                onCheckChange={(imageId: string) => handleCheckChange(imageId)}
                checkedImages={checkedImages}
                handleAllCheck={handleAllCheck}
              />
            </Tab.Pane>
            <Tab.Pane eventKey="second">
              <Gallary
                images={images}
                preview={preview}
                handleDeleteImage={handleDeleteImage}
                onCheckChange={(imageId: string) => handleCheckChange(imageId)}
                checkedImages={checkedImages}
              />
            </Tab.Pane>
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
  );
};

export default ImageGallary;
