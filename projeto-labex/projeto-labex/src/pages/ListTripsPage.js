import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { goBack } from "../routes/coordinator";
import { goToApplicationFormPage } from "../routes/coordinator";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CardStyle from "../components/CardStyle";
import Body from "../components/BodyStyle";
import Buttons from "../components/ButtonsStyle";


const ListTripsPage = () => {
  const [showTripsList, setShowTripsList] = useState([]);

  const url =
    "https://us-central1-labenu-apis.cloudfunctions.net/labeX/arthur-prado-silveira/trips";

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        setShowTripsList(response.data.trips);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const mapTripsList = showTripsList.map((trip) => {
    return (
      <CardStyle>
        <h3>{trip.name}</h3>
        <p><b>Duração em dias: </b>{trip.durationInDays}</p>
        <p><b>Para qual planeta:</b> {trip.planet}</p>
        <p><b>Data da viagem:</b> {trip.date}</p>
        <p><b>Descrição da viagem:</b> {trip.description}</p>
      </CardStyle>
    );
  });

  return (
    <div>
      <Header />
      <Body>
      {mapTripsList}
      <div>
      <Buttons onClick={() => goBack(navigate)}>
        Voltar 
        </Buttons>
      <Buttons onClick={() => goToApplicationFormPage(navigate)}>
        Inscrever-se
      </Buttons>
      </div>
      </Body>
      <Footer />
    </div>
  );
};

export default ListTripsPage;
