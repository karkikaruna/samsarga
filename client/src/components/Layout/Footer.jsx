import React, { useContext } from "react";
import { Context } from "../../main";
import { Link } from "react-router-dom";
import { FaLinkedin  } from "react-icons/fa";


const Footer = () => {
  const { isAuthenticated } = useContext(Context);
  return (
    <footer className={isAuthenticated ? "footerShow" : "footerHide"}>
      <div>&copy; All Rights Reserved By Codsoft.</div>
      <div>
       
        <Link to={"https://www.linkedin.com/company/codsoft/posts/?feedView=all"} target="_blank">
          <FaLinkedin />
        </Link>
       
      </div>
    </footer>
  );
};

export default Footer;
