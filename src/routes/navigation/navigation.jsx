import { Outlet, Link } from "react-router-dom";
import { Fragment } from "react";
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
import "./navigation.styles.scss";

const Navigation = () => {
  return (
    <Fragment>
      <div className="navigation">
        <Link className="logo-container" to="/">
          <CrwnLogo className="logo" />
        </Link>

        <div className="nav-links-container">
          <Link className="nav-link" to="/shop">
            SHOP
          </Link>
          <Link className="nav-link" to="/auth">
            SIGN IN
          </Link>
        </div>
      </div>
      {/* bara de navigare ramane sus si ce e outlet adica pagina cu retsul continutului o sa vin sub bara de navigare. Daca outlet ar fi fost pus deasupra div-ului cu nav bar-ul, acesta ar fi fost in partea de jos a paginii */}
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
