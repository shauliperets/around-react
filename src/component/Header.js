import headerImage from "../images/header.svg";

function Header() {
  return (
    <header className="header">
      <img src={headerImage} alt="Header image" className="header__image" />
    </header>
  );
}

export default Header;
