import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { goBack, goToLoginPage } from "../routes/coordinator";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ButtonsStyle from "../components/ButtonsStyle";
import Body from "../components/BodyStyle";
import CardStyle from "../components/CardStyle";

const CardCandidate = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  border: solid black 2px;
  margin: 20px;
  width: 30vw;
  padding: 10px;
  color: black;
  background-color: blueviolet;
`;

const Titles = styled.h2`
  color: white;
`

const TripDetailsPage = () => {
  const [detailsTrip, setDetailsTrip] = useState({
    candidates: [],
    approved: [],
  });
  const { id } = useParams();

  const decideCandidates = (candidateId, approve) => {
    const url = `https://us-central1-labenu-apis.cloudfunctions.net/labeX/arthur-prado-silveira/trips/${id}/candidates/${candidateId}/decide`;
    const body = {
      approve: approve,
    };

    axios
      .put(url, body, axiosConfig)
      .then(() => {
        getDetailsTrip(id);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const axiosConfig = {
    headers: {
      auth: localStorage.getItem("token"),
    },
  };

  const navigate = useNavigate();

  const getDetailsTrip = (id) => {
    const urlDetails = `https://us-central1-labenu-apis.cloudfunctions.net/labeX/arthur-prado-silveira/trip/${id}`;

    axios
      .get(urlDetails, axiosConfig)
      .then((response) => {
        setDetailsTrip(response.data.trip);
      })
      .catch((error) => {
        console.log(error.data);
      });
  };

  useEffect(() => {
    if (localStorage.token === undefined) {
      goToLoginPage(navigate);
    }
  }, []);

  useEffect(() => {
    getDetailsTrip(id);
  }, []);

  const mappedCandidates = detailsTrip.candidates.map((candidate) => {
    return (
      <CardStyle>
        <h3>Nome: {candidate.name} </h3>
        <p>Profissão: {candidate.profession} </p>
        <p>Idade: {candidate.age} </p>
        <p>País: {candidate.country} </p>
        <p>Texto de aplicação: {candidate.applicationText} </p>
        <ButtonsStyle onClick={() => decideCandidates(candidate.id, true)}>
          Aprovar
        </ButtonsStyle>
        <ButtonsStyle onClick={() => decideCandidates(candidate.id, false)}>
          Reprovar
        </ButtonsStyle>
      </CardStyle>
    );
  });

  const approvedCandidates = detailsTrip.approved.map((candidate) => {
    return (
      <CardStyle>
        <h3>Nome: {candidate.name} </h3>
        <p>Profissão: {candidate.profession} </p>
        <p>Idade: {candidate.age} </p>
        <p>País: {candidate.country} </p>
        <p>Texto de aplicação: {candidate.applicationText} </p>
      </CardStyle>
    );
  });

  return (
    <div>
      <Header />
      <Body>
        <CardCandidate>
          <h3>Nome: {detailsTrip.name}</h3>
          <p>Duração em dias: {detailsTrip.durationInDays}</p>
          <p>Planeta: {detailsTrip.planet}</p>
          <p>Data: {detailsTrip.date}</p>
          <p>Descrição: {detailsTrip.description}</p>
          <ButtonsStyle onClick={() => goBack(navigate)}> Voltar </ButtonsStyle>
          </CardCandidate>
          <Titles>Candidatos Pendentes</Titles>
          {mappedCandidates}

          <Titles>Candidatos Aprovados</Titles>
          {approvedCandidates}
        
      </Body>
      <Footer />
    </div>
  );
};

export default TripDetailsPage;
