import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import OwnerDetail from '../../components/owner-detail/owner-detail.component';
import InfoTable from '../../components/info-table/info-table.component';
import ownersData from '../../assets/data/owners.data';
import { ownerLabels } from '../../constants/language/english/english-labels.constants';

const OwnerPage = () => {

  const location = useLocation();
  const params = useParams();
  const owner = ownersData.find(owner => Number(owner.id) === Number(params.id));

  return (
    <OwnerDetail
      table={
        <InfoTable
          data={owner}
          layout={[
            {
              groupName: ownerLabels.OWNER_INFO,
              rows: [
              { label: ownerLabels.CONTACT_PHONE, dbColumn: 'contact_phone' },
              { label: ownerLabels.AGE, dbColumn: 'age' },
              { label: ownerLabels.DETAILS, dbColumn: 'details' },
              ]
            },
          ]}
        />
      }
    />

  )


};

export default OwnerPage;
