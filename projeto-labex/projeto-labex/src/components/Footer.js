import React from 'react'
import styled from 'styled-components'

const FooterStyle = styled.div`
  background-color: blueviolet; 
  display: flex;
  justify-content: center;
    align-items: center;
    padding: 10px;
    text-align: center;
    height: 5vh;
    
`

const Footer = () => {
   
    return (
        <FooterStyle>
            <p><b> 🚀 Aqui você encontra viagens para todo o sistema solar! Aproveite! 🚀</b> </p>
        </FooterStyle>
    )
}

export default Footer
