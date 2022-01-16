import React, { useState } from 'react';
import TallyItem, { TypeProps } from '@components/TallyItem';
import { useLocation } from 'react-router-dom';

const AddItem = () => {
  const query = useLocation().search.slice(1);
  const [type, setType] = useState((/type=(.*)&/.exec(query)?.[1] || 'add') as TypeProps['type']);
  setTimeout(() => setType('edit'), 3000);
  return <TallyItem type={type} />;
};

export default AddItem;
