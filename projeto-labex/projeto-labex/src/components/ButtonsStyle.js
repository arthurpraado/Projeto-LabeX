import styled from "styled-components";

const Buttons = styled.button`
  background-color: blueviolet;
  border: solid 1px black;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  font-size: 16px;
  margin: 4px;
  margin-bottom: 10px;
  border-radius: 20%;
  cursor: pointer;
  transition: 0.2s linear;
  &:hover {
    background-color: black;
  }
`;

export default Buttons