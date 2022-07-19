import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { goBack } from "../routes/coordinator";
import useForm from "../hooks/useForm";
import axios from "axios";
import Countries from "../countries/Countries";
import Header from "../components/Header";
import Footer from "../components/Footer";

const FormStyle = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
  margin: 10px;
  height: 72vh;
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

const ApplicationFormPage = () => {
  const { form, onChange, clearFields } = useForm({
    name: "",
    age: "",
    applicationText: "",
    profession: "",
    country: "",
  });

  const [trips, setTrips] = useState([]);
  const [chosenTrip, setChosenTrip] = useState("");

  const urlTrips =
    "https://us-central1-labenu-apis.cloudfunctions.net/labeX/arthur-prado-silveira/trips";

  const fetchTrips = () => {
    axios
      .get(urlTrips)
      .then((response) => {
        setTrips(response.data.trips);
      })
      .catch((error) => {
        console.log(error.data);
      });
  };

  useEffect(() => {
    fetchTrips();
  }, []);

  const subscribeToTrip = (event) => {
    const url = `https://us-central1-labenu-apis.cloudfunctions.net/labeX/arthur-prado-silveira/trips/${chosenTrip}/apply`;
    event.preventDefault();
    axios
      .post(url, form)
      .then(() => {
        alert("Você está inscrito!");
        clearFields();
      })
      .catch((error) => {
        console.log(error.data);
      });
  };

  const navigate = useNavigate();

  const handleTripChange = (event) => {
    setChosenTrip(event.target.value);
  };

  const countryOptions = Countries.map((country) => {
    return <option key={country.nome}>{country.nome}</option>;
  });

  const tripOptions = trips.map((trip) => {
    return (
      <option value={trip.id} key={trip.id}>
        {" "}
        {trip.name}{" "}
      </option>
    );
  });

  return (
    <div>
      <Header />
      <FormStyle onSubmit={subscribeToTrip}>
        <select value={chosenTrip} onChange={handleTripChange} required>
          <option value="">Escolha uma viagem</option>
          {tripOptions}
        </select>
        <input
          name={"name"}
          value={form.name}
          onChange={onChange}
          placeholder="Name"
          required
          pattern={"^.{3,}"}
        />
        <input
          name={"age"}
          value={form.age}
          onChange={onChange}
          placeholder="Age"
          required
          type="number"
          min={18}
        />
        <input
          name={"applicationText"}
          value={form.applicationText}
          onChange={onChange}
          placeholder={"Application Text"}
          required
          pattern={"^.{30,}"}
        />
        <input
          name={"profession"}
          value={form.profession}
          onChange={onChange}
          placeholder={"Profession"}
          required
          pattern={"^.{10,}"}
        />
        <select
          onChange={onChange}
          name={"country"}
          value={form.country}
          required
        >
          <option value={""}>Escolha um país</option>
          {countryOptions}
        </select>
        <Buttons> Enviar </Buttons>
        <Buttons onClick={() => goBack(navigate)}> Voltar </Buttons>
      </FormStyle>
      <div></div>
      <Footer />
    </div>
  );
};

export default ApplicationFormPage;
