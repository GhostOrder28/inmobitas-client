import React, { useMemo, useState, useEffect } from 'react';
import { useTable } from 'react-table';
import { Link, useNavigate } from 'react-router-dom';
import listingsData from '../../assets/data/listings.data';
import ownersData from '../../assets/data/owners.data';
import './table.styles.css';
const mobileBreakPoint = 720;

const FormattedTable = () => {

  const [width, setWidth] = useState(window.innerWidth);
  const navigate = useNavigate();

  const data = useMemo(() => listingsData.map(listing => ({
    id: listing.id,
    district: listing.district,
    county: listing.county,
    address: listing.address,
    typeOfContract: listing.typeOfContract,
    servicesIncluded: listing.servicesIncluded ? 'Yes' : 'No',
    price: `$ ${listing.price}`,
    unit: listing.unit === 'percentage' ? `${listing.commission} %` : `$ ${listing.commission}`,
    propertyType: listing.propertyType,
    floorLocation: listing.floorLocation || '-',
    floors: listing.floors || '-',
    totalArea: `${listing.totalArea} m²`,
    builtArea: `${listing.builtArea} m²`,
    features: listing.features,
  })), [])

  const columns = useMemo(() => [
    { Header: 'District', accessor: 'district' },
    { Header: 'County', accessor: 'county' },
    { Header: 'Address', accessor: 'address' },
    { Header: 'Contract', accessor: 'typeOfContract' },
    { Header: 'Services Included', accessor: 'servicesIncluded' },
    { Header: 'Price', accessor: 'price' },
    { Header: 'Commission', accessor: 'unit' },
    { Header: 'Property Type', accessor: 'propertyType' },
    { Header: 'Floor Location', accessor: 'floorLocation' },
    { Header: 'Floors', accessor: 'floors' },
    { Header: 'Total Area', accessor: 'totalArea' },
    { Header: 'Built Area', accessor: 'builtArea' },
    { Header: 'Features', accessor: 'features' },
  ], [])

  const mobileColumns = useMemo(() => [
    { Header: 'District', accessor: 'district' },
    { Header: 'County', accessor: 'county' },
    { Header: 'Price', accessor: 'price' },
  ], [])

  const tableInstance = useTable({
    columns: width < mobileBreakPoint ? mobileColumns : columns,
    data,
    getRowId: row => row.id
  })
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance

  useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, [])

  return (
    <table {...getTableProps()} className='collapse f6'>
      <thead>
        {// Loop over the header rows
          headerGroups.map(headerGroup => (
            // Apply the header row props
              <tr {...headerGroup.getHeaderGroupProps()}>
                {// Loop over the headers in each row
                  headerGroup.headers.map(column => (
                    // Apply the header cell props
                      <th {...column.getHeaderProps()}>
                        {// Render the header
                          column.render('Header')
                        }
                      </th>
                  ))}
              </tr>
          ))}
      </thead>
      <tbody>
        {// Loop over the table rows
          rows.map(row => {
            // Prepare the row for display
            prepareRow(row)
            return (
              // Apply the row props
                <tr {...row.getRowProps()} onClick={() => navigate(`/listing/:${row.original.id}`)}>
                  {// Loop over the rows cells
                    row.cells.map(cell => {
                      // Apply the cell props
                      return (
                        <td {...cell.getCellProps()}>
                          {/* <Link to={`/listing/:${row.original.id}`}> */}
                          {// Render the cell contents
                            cell.render('Cell')
                          }
                          {/* </Link> */}
                        </td>
                      )
                    })}
                </tr>
            )
          })}
      </tbody>
    </table>
  )
};

export default FormattedTable;
