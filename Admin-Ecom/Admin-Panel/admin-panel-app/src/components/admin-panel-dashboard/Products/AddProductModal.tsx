import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import Color from "./Color";
import { AddProduct, ProductColor } from "../../../interface/InterfaceProduct";

interface ModalProps {
    show: boolean;
    handleClose: () => void;
    handleShow: () => void;
    getProductData: () => void;
    product: AddProduct[];
    editedProduct: any;
}
const AddProductModal: React.FC<ModalProps> = ({ editedProduct, getProductData, show, handleClose, handleShow }) => {
    const [productData, setProductData] = useState<AddProduct>({
        selectedImages: [],
        productColor: [{ color: "#50f2b4" }],
        selectedSize: [],
        productName: "",
        quantity: "",
        price: "",
        description: "",
    });

    useEffect(() => {
        if (editedProduct) {
            setProductData((prevProductData) => ({
                ...prevProductData,
                productName: editedProduct.productName || "",
                quantity: editedProduct.quantity || "",
                price: editedProduct.price || "",
                description: editedProduct.description || "",
                selectedSize: editedProduct.size || [],
                productColor: editedProduct.color || [{ color: "#50f2b4" }],
                selectedImages: editedProduct.image || [],
            }));
        }
    }, [editedProduct]);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files: any = event.target.files;
        const imageFile: any = Array.from(files);

        if (files && !editedProduct) {
            setProductData((prevProductData) => ({
                ...prevProductData,
                selectedImages: [...imageFile],
            }));
        } else if (files && editedProduct) {
            setProductData((prevProductData) => ({
                ...prevProductData,
                selectedImages: [...prevProductData?.selectedImages!, ...imageFile],
            }));
        }
    };

    let productId: any = crypto.randomUUID();

    const handleDeleteImage = (index: number) => {
        const updatedImages = [...productData?.selectedImages!];
        updatedImages.splice(index, 1);
        setProductData((prevProductData) => ({
            ...prevProductData,
            selectedImages: updatedImages,
        }));
    };

    const fileToBase64 = (fileOrUrl: File | string): Promise<string> => {
        return new Promise((resolve, reject) => {
            if (typeof fileOrUrl === 'string') {
                resolve(fileOrUrl);
            } else {
                const reader = new FileReader();
                const blob = new Blob([fileOrUrl], { type: fileOrUrl.type });
                reader.readAsDataURL(blob);
                reader.onload = () => {
                    const baseFile = reader.result as string;
                    if (baseFile) {
                        resolve(baseFile);
                    } else {
                        reject("Error converting file to base64");
                    }
                };
                reader.onerror = (error) => reject(error);
            }
        });
    };

    const handleUpload = async () => {
        try {
            let baseFile: string[] = [];
            let formData: any = {
                productId: productId,
                productName: productData.productName,
                quantity: productData.quantity,
                price: productData.price,
                description: productData.description,
                size: productData.selectedSize,
                color: productData.productColor,
            };

            const existingImages: any = [...productData?.selectedImages!];
            for (const file of existingImages) {
                const convertedImage = await fileToBase64(file);
                baseFile.push(convertedImage);
            }

            formData.image = baseFile;

            const endPoint = editedProduct
                ? `http://localhost:4000/products/${editedProduct.id}`
                : "http://localhost:4000/products";

            const method = editedProduct ? "PUT" : "POST";

            const response = await fetch(endPoint, {
                method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setProductData((prevProductData) => ({
                    ...prevProductData,
                    selectedImages: [],
                }));
                getProductData();
                handleClose();
            }
        } catch (error) {
            console.error("Error uploading images", error);
        }
    };

    // const handleProductSize = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const { value, checked } = e.target;
    //     if (checked) {
    //         setProductData((prevProductData) => ({
    //             ...prevProductData,
    //             selectedSize: [...prevProductData?.selectedSize!, value],
    //         }));
    //     } else {
    //         if (editedProduct) {
    //             const updatedArray = productData?.selectedSize?.filter((item) => item !== value);
    //             setProductData((prevProductData) => ({ ...prevProductData, selectedSize: updatedArray }));
    //         }
    //     }
    // };
    const handleProductSize = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target;
        if (checked) {
            setProductData({
                ...productData,
                selectedSize: [...productData?.selectedSize!, value],
            });
        } else {
            if (editedProduct) {
                const updatedArray = productData?.selectedSize?.filter((item) => item !== value);
                setProductData({ ...productData, selectedSize: updatedArray });
            }
        }
    };

    const handleResetProduct = () => {
        setProductData({
            selectedImages: [],
            productColor: [{ color: "#50f2b4" }],
            selectedSize: [],
            productName: "",
            quantity: "",
            price: "",
            description: "",
        });
        handleShow();
    };

    return (
        <div>
            <Button variant="primary" className="add-product-btn" onClick={handleResetProduct} >
                Add Product
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title> {editedProduct ? "Edit Product" : " Add Product"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <input
                            type="file"
                            accept="image/*"
                            multiple
                            className="drag-input"
                            onChange={handleFileChange}
                        />
                        <div className="selected-images">
                            {productData.selectedImages &&
                                productData.selectedImages.map((item, index: number) => (
                                    <div className="product-images" key={index}>
                                        <img src={typeof item === 'string' ? item : URL.createObjectURL(new Blob([item], { type: "image/jpeg" }))
                                        }
                                            alt="Image loading"
                                            className="img-fluid list-img"
                                        />
                                        <div
                                            className="delete-image-icon"
                                            onClick={() => handleDeleteImage(index)}
                                        >
                                            <FontAwesomeIcon icon={faTimes} />
                                        </div>
                                    </div>
                                ))}
                        </div>

                        <Form.Group
                            controlId="productDetails"
                            className="d-flex justify-content-between product-details"
                        >
                            <Form.Group controlId="productName" className="form-field">
                                <Form.Label>Product Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter title"
                                    value={productData.productName}
                                    onChange={(e) =>
                                        setProductData({
                                            ...productData,
                                            productName: e.target.value,
                                        })
                                    }
                                />
                            </Form.Group>

                            <Form.Group controlId="quantity" className="form-field">
                                <Form.Label>Qty</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter title"
                                    value={productData.quantity}
                                    onChange={(e) =>
                                        setProductData({
                                            ...productData,
                                            quantity: e.target.value,
                                        })
                                    }
                                />
                            </Form.Group>

                            <Form.Group controlId="price" className="form-field">
                                <Form.Label>Price</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter title"
                                    value={productData.price}
                                    onChange={(e) =>
                                        setProductData({
                                            ...productData,
                                            price: e.target.value,
                                        })
                                    }
                                />
                            </Form.Group>
                        </Form.Group>

                        <Form.Group controlId="description" className="form-field">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={2}
                                value={productData.description}
                                onChange={(e) =>
                                    setProductData({
                                        ...productData,
                                        description: e.target.value,
                                    })
                                }
                            />
                        </Form.Group>

                        <div>Size</div>
                        <div className="product-size">
                            <Form.Group controlId="S" className="form-field size">
                                <Form.Label className="size-label">S</Form.Label>
                                <Form.Check
                                    aria-label="S"
                                    value="S"
                                    checked={productData?.selectedSize?.includes("S") || (editedProduct && editedProduct.size.includes("S"))}
                                    onChange={handleProductSize}
                                />
                            </Form.Group>
                            <Form.Group controlId="M" className="form-field size">
                                <Form.Label className="size-label">M</Form.Label>
                                <Form.Check
                                    aria-label="M"
                                    value="M"
                                    checked={productData?.selectedSize?.includes("M") || (editedProduct && editedProduct.size.includes("M"))}
                                    onChange={handleProductSize}
                                />
                            </Form.Group>
                            <Form.Group controlId="L" className="form-field size">
                                <Form.Label className="size-label">L</Form.Label>
                                <Form.Check
                                    aria-label="L"
                                    value="L"
                                    checked={productData?.selectedSize?.includes("L") || (editedProduct && editedProduct.size.includes("L"))}
                                    onChange={handleProductSize}
                                />
                            </Form.Group>
                            <Form.Group controlId="XL" className="form-field size">
                                <Form.Label className="size-label">XL</Form.Label>
                                <Form.Check
                                    aria-label="XL"
                                    value="XL"
                                    checked={productData?.selectedSize?.includes("XL") || (editedProduct && editedProduct.size.includes("XL"))}
                                    onChange={handleProductSize}
                                />
                            </Form.Group>
                            <Form.Group controlId="XXL" className="form-field size">
                                <Form.Label className="size-label">XXL</Form.Label>
                                <Form.Check
                                    aria-label="XXL"
                                    value="XXL"
                                    checked={productData?.selectedSize?.includes("XXL") || (editedProduct && editedProduct.size.includes("XXL"))}
                                    onChange={handleProductSize}
                                />
                            </Form.Group>
                        </div>

                        <div>
                            <div>Color</div>
                            <Color
                                productColor={productData?.productColor}
                                setProductColor={(colors) => setProductData({ ...productData, productColor: colors })}
                            />
                        </div>
                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleUpload}>
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default AddProductModal;







// import React, { useEffect } from "react";
// import { useState } from "react";
// import { Button, Form, FloatingLabel } from "react-bootstrap";
// import Modal from "react-bootstrap/Modal";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faXmark } from "@fortawesome/free-solid-svg-icons";
// import Color from "./Color";
// import { AddProduct, ProductColor } from "../../../interface/InterfaceProduct";

// interface ModalProps {
//     show: boolean
//     handleClose: () => void;
//     handleShow: () => void;
//     getProductData: () => void;
//     product: AddProduct[];
//     editedProduct: any
// }

// const AddProductModal: React.FC<ModalProps> = ({ editedProduct, getProductData, show, handleClose, handleShow }) => {
//     const [selectedImages, setSelectedImages] = useState<File[]>([]);
//     const [productColor, setProductColor] = useState<ProductColor[]>([{ color: "#50f2b4" }]);
//     const [selectedSize, setSelectedSize] = useState<string[]>([]);
//     const [productName, setProductName] = useState<string>("");
//     const [quantity, setQuantity] = useState<string>("");
//     const [price, setPrice] = useState<string>("");
//     const [description, setDescription] = useState<string>("")

//     useEffect(() => {
//         if (editedProduct) {
//             setProductName(editedProduct.productName || "");
//             setQuantity(editedProduct.quantity || "");
//             setPrice(editedProduct.price || "");
//             setDescription(editedProduct.description || "");
//             setSelectedSize(editedProduct.size || []);
//             setProductColor(editedProduct.color || [{ color: "#50f2b4" }]);
//             setSelectedImages(editedProduct.image || []);
//         }
//     }, [editedProduct]);

//     const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         const files: any = event.target.files;
//         const imageFile: any = Array.from(files);

//         if (files && !editedProduct) {
//             setSelectedImages([...imageFile]);
//         } else if (files && editedProduct) {
//             setSelectedImages((prevImages: any) => [...prevImages, ...imageFile]);
//             // setSelectedImages(imageFile);
//         }
//     };

//     let productId: any = crypto.randomUUID()

//     const handleDeleteImage = (index: number) => {
//         const updatedImages = [...selectedImages];
//         updatedImages.splice(index, 1);
//         setSelectedImages(updatedImages);
//     };

//     // for size========>
//     const handleProductSize = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const { value, checked } = e.target;
//         if (checked) {
//             setSelectedSize([...selectedSize, value]);
//         } else {
//             const upadteArray = selectedSize.filter((item) => item != value);
//             setSelectedSize(upadteArray);
//         }
//     };

//     const fileToBase64 = (file: File): Promise<string> => {
//         return new Promise((resolve, reject) => {
//             const reader = new FileReader();
//             const blob = new Blob([file], { type: file.type });
//             reader.readAsDataURL(blob);
//             reader.onload = () => {
//                 const baseFile = reader.result as string;
//                 if (baseFile) {
//                     resolve(baseFile);
//                 } else {
//                     reject("Error converting file to base64");
//                 }
//             };
//             reader.onerror = (error) => reject(error);
//         });
//     };

//     const handleUpload = async () => {
//         try {
//             let baseFile: string[] = [];
//             let formData: any = {};

//             formData.productId = productId;
//             formData.productName = productName;
//             formData.quantity = quantity;
//             formData.price = price;
//             formData.description = description;
//             formData.size = selectedSize;
//             formData.color = productColor;

//             const existingImages = [...selectedImages];
//             for (const file of existingImages) {
//                 const convertedImage = await fileToBase64(file);
//                 baseFile.push(convertedImage);
//             }

//             formData.image = baseFile;

//             const endPoint = editedProduct
//                 ? `http://localhost:4000/products/${editedProduct.id}`
//                 : "http://localhost:4000/products";

//             const method = editedProduct ? "PUT" : "POST";

//             const response = await fetch(endPoint, {
//                 method,
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify(formData),
//             });

//             if (response.ok) {
//                 setSelectedImages([]);
//                 getProductData();
//                 handleClose();
//             }
//         } catch (error) {
//             console.error("Error uploading images", error);
//         }
//     };

//     const handleResetProduct = () => {
//         setSelectedImages([])
//         handleShow()
//     }

//     return (
//         <div>
//             <Button
//                 variant="primary"
//                 className="add-product-btn"
//                 onClick={handleResetProduct}
//             >
//                 Add Product
//             </Button>
//             <Modal show={show} onHide={handleClose}>
//                 <Modal.Header closeButton>
//                     <Modal.Title>Add Product</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                     <Form>
//                         <input
//                             type="file"
//                             accept="image/*"
//                             multiple
//                             className="drag-input"
//                             onChange={handleFileChange}
//                         />
//                         <div className="selected-images">

//                             {selectedImages &&
//                                 selectedImages.map((item, index: number) => {
//                                     return (
//                                         <div className="product-images" key={index}>
//                                             <img
//                                                 src={typeof item === 'string' && item || URL.createObjectURL(new Blob([item], { type: "image/jpeg" }))}
//                                                 alt="Image loading"
//                                                 className="img-fluid list-img"
//                                             />
//                                             <div
//                                                 className="delete-image-icon"
//                                                 onClick={() => handleDeleteImage(index)}
//                                             >
//                                                 <FontAwesomeIcon icon={faXmark} />
//                                             </div>
//                                         </div>
//                                     );
//                                 })}

//                         </div>
//                         <div className="d-flex justify-content-between product-details">
//                             <Form.Group controlId="title" className="form-field">
//                                 <Form.Label>Product Name</Form.Label>
//                                 <Form.Control type="text" placeholder="Enter title" value={productName} onChange={(e) => setProductName(e.target.value)} />
//                             </Form.Group>
//                             <Form.Group controlId="title" className="form-field">
//                                 <Form.Label>Qty</Form.Label>
//                                 <Form.Control type="text" placeholder="Enter title" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
//                             </Form.Group>
//                             <Form.Group controlId="title" className="form-field">
//                                 <Form.Label>Price</Form.Label>
//                                 <Form.Control type="text" placeholder="Enter title" value={price} onChange={(e) => setPrice(e.target.value)} />
//                             </Form.Group>
//                         </div>
//                         <Form.Group controlId="description" className="form-field">
//                             <Form.Label>Description</Form.Label>
//                             <Form.Control as="textarea" rows={2} value={description} onChange={(e) => setDescription(e.target.value)} />
//                         </Form.Group>
//                         <div>Size</div>
//                         <div className="product-size">
//                             <Form.Group controlId="S" className="form-field size">
//                                 <Form.Label className="size-label">S</Form.Label>
//                                 <Form.Check
//                                     aria-label="S"
//                                     value={`S`}
//                                     checked={selectedSize.includes("S") || (editedProduct && editedProduct.size.includes("S"))}
//                                     onChange={handleProductSize}
//                                 />
//                             </Form.Group>
// <Form.Group controlId="M" className="form-field size">
//     <Form.Label className="size-label">M</Form.Label>
//     <Form.Check
//         aria-label="M"
//         value="M"
//         checked={selectedSize.includes("M") || (editedProduct && editedProduct.size.includes("M"))}
//         onChange={handleProductSize}
//     />
// </Form.Group>
// <Form.Group controlId="L" className="form-field size">
//     <Form.Label className="size-label">L</Form.Label>
//     <Form.Check
//         aria-label="L"
//         value="L"
//         checked={selectedSize.includes("L") || (editedProduct && editedProduct.size.includes("L"))}
//         onChange={handleProductSize}
//     />
// </Form.Group>
//                             <Form.Group controlId="XL" className="form-field size">
//                                 <Form.Label className="size-label">XL</Form.Label>
//                                 <Form.Check
//                                     aria-label="XL"
//                                     value="XL"
//                                     checked={selectedSize.includes("XL") || (editedProduct && editedProduct.size.includes("XL"))}
//                                     onChange={handleProductSize}
//                                 />
//                             </Form.Group>
//                             <Form.Group controlId="XXL" className="form-field size">
//                                 <Form.Label className="size-label">XXL</Form.Label>
//                                 <Form.Check
//                                     aria-label="XXL"
//                                     value="XXL"
//                                     checked={selectedSize.includes("XXL") || (editedProduct && editedProduct.size.includes("XXL"))}
//                                     onChange={handleProductSize}
//                                 />
//                             </Form.Group>
//                         </div>

//                         <div>
//                             <div>Color</div>
//                             <Color productColor={productColor} setProductColor={setProductColor} />
//                         </div>
//                     </Form>
//                 </Modal.Body>

//                 <Modal.Footer>
//                     <Button variant="secondary" onClick={handleClose}>
//                         Cancel
//                     </Button>
//                     <Button variant="primary" onClick={handleUpload}>
//                         Submit
//                     </Button>
//                 </Modal.Footer>
//             </Modal>
//         </div>
//     );
// };

// export default AddProductModal;
