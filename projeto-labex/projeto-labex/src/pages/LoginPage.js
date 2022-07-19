import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { goToHomePage, goToAdminHomePage } from "../routes/coordinator";
import useForm from "../hooks/useForm";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Body from "../components/BodyStyle";
import Buttons from "../components/ButtonsStyle";


const Login = styled.div`
  color: white;
  display: flex;
  margin: auto;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const DivButton = styled.div`
 margin: 10px;
`

const InputsStyle = styled.input`
  display: flex;
  flex-direction: column;
  margin: 10px;
  padding: 10px;
`;

const LoginPage = () => {
  const url =
    "https://us-central1-labenu-apis.cloudfunctions.net/labeX/arthur-prado-silveira/login";

  const { form, onChange, cleanFields } = useForm({
    email: "",
    password: "",
  });

  const login = (event) => {
    event.preventDefault();
    axios
      .post(url, form)
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        goToAdminHomePage(navigate);
      })
      .catch(() => {
        alert("Email e/ou senha errados");
        cleanFields();
      });
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.token !== undefined) {
      console.log(localStorage.token);
      goToAdminHomePage(navigate);
    }
  }, []);

  return (
    <div>
      <Header />
      <Body>
        <Login>
          <h1> Login </h1>
          <form onSubmit={login}>
            <InputsStyle
              name={"email"}
              value={form.email}
              onChange={onChange}
              placeholder="E-mail"
              required
              type={"email"}
            />
            <InputsStyle
              name={"password"}
              value={form.password}
              onChange={onChange}
              placeholder="Password"
              required
              type={"password"}
            />
          </form>
          <DivButton>
          <Buttons onClick={login}> Entrar </Buttons>
          <Buttons onClick={() => goToHomePage(navigate)}> Voltar </Buttons>
          </DivButton>
        </Login>
      </Body>
      <Footer />
    </div>
  );
};

export default LoginPage;
