import { Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

interface HeaderProps {
  adminName?: string;
}
const Header: React.FC<HeaderProps> = ({ adminName }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("loginUser");
    navigate("/");
  };
  return (
    <Navbar className="notes-nav bg-body-tertiary justify-content-end align-items-center header-title">
      <div className="d-flex align-items-center gap-4">
        <div className="user-name ">
          <h5>{adminName} </h5>
        </div>
        <div className="delete-icon logout">
          <FontAwesomeIcon icon={faRightFromBracket} onClick={handleLogout} />
        </div>
      </div>
    </Navbar>
  );
};
export default Header;
