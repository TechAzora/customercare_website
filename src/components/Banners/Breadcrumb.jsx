import React from "react";
import { Heading, Row, Wrapper } from "../ComponentsIndex";
import { Link } from "react-router-dom";

function Breadcrumb({ children, PageLink,PageName}) {
  return (
    <Row className="bg-[#F5F5F5] p-5 flex justify-center">
      <Wrapper className="w-10/12 flex">
       <Link to="/" className="mx-1">
       <Heading>
          <i className="bi bi-house mx-1"></i>Home
        </Heading>{" "}
       </Link>
        /{" "}{" "}
        <Link to={`/${PageLink}`} className="mx-1">
          {" "}
          <Heading className={"text-custom-purple"}>
            {PageName}
          </Heading>
        </Link>
      </Wrapper>
    </Row>
  );
}

export default Breadcrumb;
