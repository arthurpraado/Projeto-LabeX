import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { goBack, goToLoginPage } from "../routes/coordinator";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";

const CardCandidate = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const Buttons = styled.button`
  display: flex;
  background-color: #4caf50;
  border: solid 1px black;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  font-size: 16px;
  margin: 4px;
  border-radius: 50%;
  cursor: pointer;
  transition: 0.2s linear;
  margin: 0 auto;
  &:hover {
    background-color: aquamarine;
  }
`;

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
      <CardCandidate>
        <h3>Nome: {candidate.name} </h3>
        <p>Profissão: {candidate.profession} </p>
        <p>Idade: {candidate.age} </p>
        <p>País: {candidate.country} </p>
        <p>Texto de aplicação: {candidate.applicationText} </p>
        <Buttons onClick={() => decideCandidates(candidate.id, true)}>
          Aprovar
        </Buttons>
        <Buttons onClick={() => decideCandidates(candidate.id, false)}>
          Reprovar
        </Buttons>
      </CardCandidate>
    );
  });

  const approvedCandidates = detailsTrip.approved.map((candidate) => {
    return (
      <CardCandidate>
        <h3>Nome: {candidate.name} </h3>
        <p>Profissão: {candidate.profession} </p>
        <p>Idade: {candidate.age} </p>
        <p>País: {candidate.country} </p>
        <p>Texto de aplicação: {candidate.applicationText} </p>
      </CardCandidate>
    );
  });

  return (
    <div>
    <Header/>
    <CardCandidate>
      <h3>Nome: {detailsTrip.name}</h3>
      <p>Duração em dias: {detailsTrip.durationInDays}</p>
      <p>Planeta: {detailsTrip.planet}</p>
      <p>Data: {detailsTrip.date}</p>
      <p>Descrição: {detailsTrip.description}</p>
      <Buttons onClick={() => goBack(navigate)}> Voltar </Buttons>
      <h2>Candidatos Pendentes</h2>
      {mappedCandidates}

      <h2>Candidatos Aprovados</h2>
      {approvedCandidates}
    </CardCandidate>
    <Footer/>
    </div>
  );
};

export default TripDetailsPage;
