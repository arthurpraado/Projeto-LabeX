import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import {
  goToHomePage,
  goToLoginPage,
  goToCreateTripPage,
  goToTripDetailsPage
} from "../routes/coordinator";
import axios from 'axios'
import Header from "../components/Header";
import Footer from "../components/Footer";
import CardStyle from "../components/CardStyle";
import Body from "../components/BodyStyle";
import Buttons from "../components/ButtonsStyle";


const SpanCard = styled.span`
  display: flex;
  justify-content: center;
  :hover {
    text-decoration-line: underline;
    cursor: pointer;
  }
`

const ButtonsDiv = styled.div`
  display: flex;
  margin: 10px;
`

const ButtonDelete = styled.button`
display: flex;
  justify-content: center;
  background-color: blueviolet;
  margin: auto;
  border: 0;
  cursor: pointer;
  transition: 0.2s linear;
  &:hover {
    background-color: black;
  }
`


const AdminHomePage = () => {

  const [tripName, setTripName] = useState([])

  const url = "https://us-central1-labenu-apis.cloudfunctions.net/labeX/arthur-prado-silveira/trips"


  const navigate = useNavigate()

  const axiosConfig = {
    headers: {
      auth: localStorage.getItem("token")
    }
  }

  const getTrips = () => {
    
    axios.get(url)
    .then((response) => {
      setTripName(response.data.trips)
    })
    .catch((error) => {
      console.log(error.data)
    })
  }

  useEffect (() => {
    getTrips()
  }, [])

  const onClickDelete = (id) => {

    const urlDelete = `https://us-central1-labenu-apis.cloudfunctions.net/labeX/arthur-prado-silveira/trips/${id}`

    axios
      .delete(urlDelete, axiosConfig)
      .then((response) => {
        getTrips()
      })
      .catch((error) => {
        console.log(error.data);
      });
  }
  
  const logout = () => {
    localStorage.removeItem("token");
    goToLoginPage(navigate);
  };

  useEffect(() => {
    if (localStorage.token === undefined) {
      goToLoginPage(navigate);
    }
  }, []);

  const goToDetailsPage = (id) => {
      goToTripDetailsPage(navigate, id)
  }
   

  const mapTripsName = tripName.map((trip) => {
    return(
      <CardStyle>
        <SpanCard value={trip.id} onClick={() => goToDetailsPage(trip.id)}><h3>{trip.name}</h3></SpanCard> 
        <ButtonDelete key={trip.id} value={trip.id} onClick={() => onClickDelete(trip.id)}>🗑️</ButtonDelete>
      </CardStyle>
    )
  })

  return (
    <div>
      <Header/>
      <Body>
      {mapTripsName}
      <ButtonsDiv>
      <Buttons onClick={() => goToHomePage(navigate)}> Voltar </Buttons>
      <Buttons onClick={() => goToCreateTripPage(navigate)}> Criar Viagem </Buttons>
      <Buttons onClick={() => logout()}> Deslogar </Buttons>
      </ButtonsDiv>
      </Body>
      <Footer/>
    </div>
  );
};

export default AdminHomePage;
