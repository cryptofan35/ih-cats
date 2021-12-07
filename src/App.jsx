import styled from "styled-components";
import Kittens from "./component/Table";
import "./App.css";

const StyledDiv = styled.div`
  margin: 3rem;
`;

function App() {
  return (
    <div className="App">
      <StyledDiv>
        <h1>100 Kittens</h1>
        <Kittens />
      </StyledDiv>
    </div>
  );
}

export default App;
