import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import OwnerDetail from '../../components/owner-detail/owner-detail.component';
import ownersData from '../../assets/data/owners.data';

const OwnerPage = () => {

  const location = useLocation();
  const params = useParams();

  return <OwnerDetail data={
    ownersData.find(owner => Number(owner.id) === Number(params.id))
  }/>

};

export default OwnerPage;
