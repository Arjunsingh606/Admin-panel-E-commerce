import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import {AddProduct, ProductColor} from '../../../interface/InterfaceProduct'

interface ColorPros{
    productColor:any[]
    setProductColor:(value:any)=>void;
}

const Color:React.FC<ColorPros> = ({productColor, setProductColor }) => {
    // const [productColor, setProductColor] = useState([{ color: "" }]);

    const handleAddInput = () => {
        setProductColor([...productColor, { color: "#50f2b4" }]);
    };

    const handleChange = (event: any, index: number) => {
        let { name, value } = event.target;
        let onChangeValue: any = [...productColor];
        onChangeValue[index][name] = value;
        setProductColor(onChangeValue);
    };

    const handleDeleteInput = (index: number) => {
        const newArray = [...productColor];
        newArray.splice(index, 1);
        setProductColor(newArray);
    };

    return (
        <div  className="color-picker">
            {productColor.map((item, index) => (
                <div className="input_container product-color" key={index}>
                    <input
                        name="color"
                        type="color"
                        value={item.color}
                        onChange={(event) => handleChange(event, index)}
                    />
                    {productColor.length > 1 && (
                        <FontAwesomeIcon icon={faMinus}  onClick={() => handleDeleteInput(index)}/>
                    )}
                    {index === productColor.length - 1 && (
                        <FontAwesomeIcon icon={faPlus}  onClick={() => handleAddInput()}/>
                    )}
                </div>
            ))}
        </div>
    );
}

export default Color;