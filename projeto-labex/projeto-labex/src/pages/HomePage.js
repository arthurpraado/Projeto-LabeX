import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { goToTripsPage, goToLoginPage } from "../routes/coordinator";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Body from "../components/BodyStyle";
import Buttons from "../components/ButtonsStyle";


const DivPai = styled.div`
height: 100%;
`
const SubTitulo = styled.h1`
  color: white;
`

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <DivPai>
      <Header/>
      <Body>
        <SubTitulo>Seu aplicativo de viagens espaciais!</SubTitulo>
        <div>
          <Buttons onClick={() => goToTripsPage(navigate)}>
            Lista de Viagens
          </Buttons>
          <Buttons onClick={() => goToLoginPage(navigate)}>
            Área de Login
          </Buttons>
        </div>
      </Body>
      <Footer/>
    </DivPai>
  );
};

export default HomePage;
