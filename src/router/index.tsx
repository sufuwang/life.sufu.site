import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router';
import { Spin } from 'antd';
import Container from "@components/Container";

const Table = lazy(() => import('@pages/Tally/Table/index'));
const Trend = lazy(() => import('@pages/Tally/Trend/index'));
const Item = lazy(() => import('@pages/Tally/Item/index'));
const Heart = lazy(() => import('@pages/Heart/index'));

const router = () => {
  return (
    <Container.WithNavigate>
      <Suspense fallback={<Spin />}>
        <Routes>
          <Route path="/tally">
            <Route path="table" element={<Table />} />
            <Route path="trend" element={<Trend />} />
            <Route path="item" element={<Item />} />
          </Route>
          <Route path="/heart">
            <Route path="time" element={<Heart />} />
          </Route>
        </Routes>
      </Suspense>
    </Container.WithNavigate>
  );
};

export default router;
