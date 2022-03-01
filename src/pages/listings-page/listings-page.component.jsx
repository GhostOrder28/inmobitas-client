import React from 'react';
import FormattedTable from '../../components/table/table.component';
import { Pane } from 'evergreen-ui';
import './listings-page.styles.css';

const ListingsPage = () => {
  return (
    <Pane overflow={'scroll'} borderColor={'black'} elevation={0}>
      <FormattedTable />
    </Pane>
  )
};

export default ListingsPage;
