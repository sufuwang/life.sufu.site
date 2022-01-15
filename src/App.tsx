import React, { useState } from "react";
import Tally from "@pages/tally";
import Container from "@components/Container";

const App = () => {
  const [curTab, setCurTab] = useState(['Tally', 'Table']);
  const handleChangeNavigate = ({ keyPath = ['', ''] }) => {
    setCurTab(keyPath.reverse());
  };
  const render = () => {
    const [firstTab, secondTab] = curTab;
    if (firstTab === 'Tally') {
      return <Tally tab={secondTab} />;
    }
  };
  return (
    <Container onClick={handleChangeNavigate}>
      {render()}
    </Container>
  );
};

export default App;
