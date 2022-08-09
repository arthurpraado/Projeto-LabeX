import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { goBack } from "../routes/coordinator";
import useForm from "../hooks/useForm";
import axios from "axios";
import Countries from "../countries/Countries";
import Header from "../components/Header";
import Footer from "../components/Footer";
import InputsStyle from "../components/InputsStyle"
import Buttons from "../components/ButtonsStyle";
import Body from "../components/BodyStyle";

const FormStyle = styled.form`
  display: flex;
  flex-direction: column;
`;

const SelectStyle = styled.select`
  margin: 10px;
  padding: 10px;
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
      <Body>
      <FormStyle onSubmit={subscribeToTrip}>
        <SelectStyle value={chosenTrip} onChange={handleTripChange} required>
          <option value="">Escolha uma viagem</option>
          {tripOptions}
        </SelectStyle>
        <InputsStyle
          name={"name"}
          value={form.name}
          onChange={onChange}
          placeholder="Name"
          required
          pattern={"^.{3,}"}
        />
        <InputsStyle
          name={"age"}
          value={form.age}
          onChange={onChange}
          placeholder="Age"
          required
          type="number"
          min={18}
        />
        <InputsStyle
          name={"applicationText"}
          value={form.applicationText}
          onChange={onChange}
          placeholder={"Application Text"}
          required
          pattern={"^.{30,}"}
        />
        <InputsStyle
          name={"profession"}
          value={form.profession}
          onChange={onChange}
          placeholder={"Profession"}
          required
          pattern={"^.{10,}"}
        />
        <SelectStyle
          onChange={onChange}
          name={"country"}
          value={form.country}
          required
        >
          <option value={""}>Escolha um país</option>
          {countryOptions}
        </SelectStyle>
        <div>
        <Buttons> Enviar </Buttons>
        <Buttons onClick={() => goBack(navigate)}> Voltar </Buttons>
        </div>
      </FormStyle>
      </Body>
      <Footer />
    </div>
  );
};

export default ApplicationFormPage;
