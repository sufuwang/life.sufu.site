import React from "react";
import Table from "@components/Table";
import Chart from "@components/Chart";

interface TypeProps {
  tab: 'Table' | 'Chart' | string
}

const App = ({ tab = 'Table' }: TypeProps) => {
  if (tab === 'Table') {
    return <Table />;
  }
  return <Chart />;
};

export default App;
