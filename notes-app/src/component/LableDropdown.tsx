import React, { useState, useEffect } from "react";
import { ColorLable, NoteData } from "../interface/Interfaces";

interface CustomDropdownProps {
  labelNameColor: ColorLable[];
  setLabel: (option: ColorLable) => void;
  selectedNote: NoteData | null;
}

const LableDropdown: React.FC<CustomDropdownProps> = ({ labelNameColor, setLabel, selectedNote }) => {
  const [selectedLabel, setselectedLabel] = useState<ColorLable | null>(null);
  const [dropDown, setDropDown] = useState(false);

  const handleOptionClick = (labelNameColor: ColorLable) => {
    setselectedLabel(labelNameColor);
    setLabel(labelNameColor);
    setDropDown(false);
  };

  const toggleDropdown = () => {
    if (!selectedLabel && selectedNote) {
      setselectedLabel({
        label: selectedNote.label,
        color: selectedNote.color,
      });
    }
    setDropDown(!dropDown);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const dropdownContainer = document.getElementById("custom-dropdown");
      if (dropdownContainer && !dropdownContainer.contains(event.target as Node)) {
        setDropDown(false);
      }
    };
    if (dropDown) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropDown]);

  useEffect(() => {
    if (selectedNote) {
      setselectedLabel({
        label: selectedNote.label,
        color: selectedNote.color,
      });
    }
  }, [selectedNote]);

  return (
    <div id="custom-dropdown" className="custom-dropdown">
      <div className="selected-option" onClick={toggleDropdown}>
        {selectedLabel ? (
          <div className="lable-color">
            <div
              className="color-circle"
              style={{ backgroundColor: selectedLabel.color }}
            ></div>
            <span className="title">{selectedLabel.label}</span>
          </div>
        ) : (
          <span className="title">Label</span>
        )}
      </div>
      {dropDown && (
        <div className="dropdown-options">
          {labelNameColor.map((option, index) => (
            <div
              key={index}
              className="option"
              onClick={() => handleOptionClick(option)}
            >
              <div
                className="color-circle"
                style={{ backgroundColor: option.color }}
              ></div>
              <span>{option.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LableDropdown;







// import React, { useState, useEffect } from "react";
// import { ColorLable, NoteData } from "../interface/Interfaces";

// interface CustomDropdownProps {
//   labelNameColor: ColorLable[];
//   setLabel: (option: ColorLable) => void;
//   selectedNote: NoteData | null;
// }

// const LableDropdown: React.FC<CustomDropdownProps> = ({labelNameColor, setLabel, selectedNote}) => {
//   const [selectedLabel, setselectedLabel] = useState<ColorLable | null>(null);
//   const [dropDown, setDropDown] = useState(false);

//   const handleOptionClick = (labelNameColor: ColorLable) => {
//     setselectedLabel(labelNameColor);
//     setLabel(labelNameColor);
//     setDropDown(false);
//   };

//   const toggleDropdown = () => {
//     if (!selectedLabel && selectedNote) {
//       setselectedLabel({
//         label: selectedNote.label,
//         color: selectedNote.color,
//       });
//     }
//     setDropDown(true);
//   };

//   useEffect(() => {
//     if (selectedNote) {
//       setselectedLabel({
//         label: selectedNote.label,
//         color: selectedNote.color,
//       });
//     }
//   }, [selectedNote]);

//   return (
//     <div className="custom-dropdown">
//       <div className="selected-option" onClick={toggleDropdown}>
//         {selectedLabel ? (
//           <div className="lable-color">
//             <div
//               className="color-circle"
//               style={{ backgroundColor: selectedLabel.color }}
//             ></div>
//             <span className="title">{selectedLabel.label}</span>
//           </div>
//         ) : (
//           <span className="title">Label</span>
//         )}
//       </div>
//       {dropDown && (
//         <div className="dropdown-options">
//           {labelNameColor.map((option, index) => (
//             <div
//               key={index}
//               className="option"
//               onClick={() => handleOptionClick(option)}
//             >
//               <div
//                 className="color-circle"
//                 style={{ backgroundColor: option.color }}
//               ></div>
//               <span>{option.label}</span>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default LableDropdown;
