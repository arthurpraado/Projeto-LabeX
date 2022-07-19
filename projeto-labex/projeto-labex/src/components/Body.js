import React from "react";
import styled from 'styled-components';
import espaco from "../img/espaco.jpg";

const BodyStyle = styled.div`
background-image: url(${espaco});
  display: flex;
  margin: auto;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 85vh;
`

const Body = () => {
    return (
        <BodyStyle>
            <div></div>
        </BodyStyle>
    )
}

export default Body