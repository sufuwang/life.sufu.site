import React from 'react';
import { Routes, Route } from 'react-router';

import Container from "@components/Container";
import Tally from '@pages/Tally';
import Heart from '@pages/Heart';

const router = () => {
  return (
    <Container.WithNavigate>
      <Routes>
        <Route path="/tally">
          <Route path="detail" element={<Tally.Detail />} />
          <Route path="trend" element={<Tally.Trend />} />
          <Route path="item" element={<Tally.Item />} />
        </Route>
        <Route path="/heart">
          <Route path="time" element={<Heart />} />
        </Route>
      </Routes>
    </Container.WithNavigate>
  );
};

export default router;
