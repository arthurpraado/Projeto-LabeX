import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { goToHomePage } from "../routes/coordinator";

const HeaderStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: blueviolet;
  padding: 10px;
  text-align: center;
  height: 5vh;
`;

const Titulo = styled.h1`
margin-left: 10px;
:hover {
    cursor: pointer;
}
`


const Header = () => {
    const navigate = useNavigate()
  return (
    <HeaderStyle>
      <Titulo onClick={() => goToHomePage(navigate)}> LabeX </Titulo>
    </HeaderStyle>
  );
};

export default Header;
