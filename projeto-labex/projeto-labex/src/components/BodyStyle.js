import styled from 'styled-components'
import espaco from '../img/espaco.jpg'

const Body = styled.div`
background-image: url(${espaco});
display: flex;
margin: auto;
justify-content: center;
align-items: center;
flex-direction: column;
min-height: 85vh;
`;

export default Body