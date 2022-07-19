import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { goBack, goToLoginPage } from "../routes/coordinator";
import useForm from "../hooks/useForm";
import axios from "axios";
import Planets from "../planets/Planets";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Body from "../components/BodyStyle";
import Buttons from "../components/ButtonsStyle";
import InputsStyle from "../components/InputsStyle";

const FormStyle = styled.form`
  display: flex;
  flex-direction: column;
`;
const SelectStyle = styled.select`
  margin: 10px;
  padding: 10px;
`;

const Titulo = styled.h1`
  color: white;
`

const CreateTripPage = () => {
  const { form, onChange, clearFields } = useForm({
    name: "",
    planet: "",
    date: "",
    description: "",
    durationInDays: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.token === undefined) {
      goToLoginPage(navigate);
    }
  }, []);

  const createTrip = (event) => {
    const url =
      "https://us-central1-labenu-apis.cloudfunctions.net/labeX/arthur-prado-silveira/trips";
    const axiosConfig = {
      headers: {
        auth: localStorage.getItem("token"),
      },
    };

    axios
      .post(url, form, axiosConfig)
      .then((response) => {
        console.log(response.data.trip);
        alert("Sua viagem foi criada com sucesso");
        clearFields();
      })
      .catch((error) => {
        console.log(error.data);
      });
  };

  const planetOptions = Planets.map((planet) => {
    return <option key={planet}>{planet}</option>;
  });

  return (
    <div>
      <Header />
      <Body>
        <Titulo>Criar Viagem</Titulo>
        <FormStyle onSubmit={createTrip}>
          <InputsStyle
            name={"name"}
            value={form.name}
            onChange={onChange}
            placeholder="Nome do evento"
            required
            type={"name"}
            pattern={"^.{5,}"}
          />
          <SelectStyle
            name={"planet"}
            value={form.planet}
            onChange={onChange}
            required
          >
            <option value="">Escolha um planeta</option>
            {planetOptions}
          </SelectStyle>
          <InputsStyle
            name={"date"}
            value={form.date}
            onChange={onChange}
            placeholder="Data do evento"
            required
            type={"date"}
            min={new Date().toLocaleDateString("en-ca")} //necessário para colocar no formato ano-mes-dia, que o InputsStyle date precisa
          />
          <InputsStyle
            name={"description"}
            value={form.description}
            onChange={onChange}
            placeholder="Descrição do evento"
            required
            pattern={"^.{30,}"}
          />
          <InputsStyle
            name={"durationInDays"}
            value={form.durationInDays}
            onChange={onChange}
            placeholder="Duração do evento em dias"
            required
            type="number"
            min={50}
          />
          
        </FormStyle>
        <div>
        <Buttons onClick={() => createTrip()}> Criar </Buttons>
        <Buttons onClick={() => goBack(navigate)}> Voltar </Buttons>
        </div>
      </Body>
      <Footer />
    </div>
  );
};

export default CreateTripPage;
