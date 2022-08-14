import React, { useRef, useState, FC, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentUserId } from '../../redux/user/user.selectors';
import {
  EditIcon,
  CrossIcon,
  Table, 
  TableBody, 
  TableHead, 
  TableRow, 
  TableCell,
  TableHeaderCell,
} from "evergreen-ui";
//import { useTable, usePagination } from 'react-table';

import { buildRoute } from "../../utils/utility-functions";
import useRelativeHeight from '../../hooks/use-relative-height/use-relative-height';
import { CustomTableProps } from './custom-table.types';
import CustomTableOption from './custom-table-option';
import http from '../../utils/axios-instance';

const CustomTable: FC<CustomTableProps> = ({ source, setSource, labels, detailRouteStructure, editRouteStructure, deleteBaseUrl }) => {
  const navigate = useNavigate();
  const sourceListRef = useRef<HTMLDivElement | null>(null);
  const tableRelativeHeight = useRelativeHeight(sourceListRef);
  const userId = useSelector(selectCurrentUserId) as number;
  const [highlightedRow, setHighlightedRow] = useState<number | null>(null)

  //const data = useMemo(() => source.map(item => {
    //const itemKeys = Object.keys(item);
    //const itemProps = itemKeys.filter(prop => !prop.includes('Id'));
    //const entityIdentifier = itemKeys.find(key => key.includes('Id')) as string; //id is always present, if not then it is an error from the server side, same happems with entityId
    //const entityId = item[entityIdentifier] as number;

    //return itemProps.map(prop => item[prop]);

  //}), [source]);

  //const columns = useMemo(() => source.map(item => {
    //const itemKeys = Object.keys(item);
    //const itemProps = itemKeys.filter(prop => !prop.includes('Id'));

    //return itemProps.map((prop, idx) => ({
      //Header: labels[idx],
      //accessor: prop,
    //}))
  //}), [])

  //const tableInstance = useTable(
    //{ 
      //columns, 
      //data, 
      //initialState: {
        //pageIndex: 0,
      //},
    //}, 
    //usePagination
  //)

  //const {
    //getTableProps,
    //getTableBodyProps,
    //headerGroups,
    //prepareRow,
    //page,
    //pageCount,
    //state,
    //setPageSize,
    //previousPage,
    //nextPage,
    //gotoPage,
  //} = tableInstance;


  const onDelete = async (userId: number, entityId: number, entityIdentifier: string) => {
    const deletedEntity = await http.delete(`${deleteBaseUrl}/${userId}/${entityId}`);
    const remainingEntities = source.filter(item => item[entityIdentifier] !== deletedEntity.data)
    setSource(remainingEntities) 
  }

  //const getFlexValues = (idx: number, columnsLength: number) => idx === columnsLength - 1 ? .4 : .45;

  return (
      /*<Table flex={1} {...getTableProps()}>
        <TableHead display={'flex'} userSelect={'none'}>
          {
            headerGroups.map(headerGroup => (
              headerGroup.headers.map((column, idx) => (
                <TableHeaderCell  flex={getFlexValues(idx, headerGroup.headers.length)} {...column.getHeaderProps()}>
                  {
                    column.render('Header')
                  }
                </TableHeaderCell>
              ))
            )) 
          }
        </TableHead>
        <TableBody ref={sourceListRef} height={tableRelativeHeight} overflow={'scroll'} {...getTableBodyProps()}>
          {
            page.map((row, rowIdx) => {
              prepareRow(row)
              return (
                <TableRow
                  height={50}
                  isSelectable
                  color={'#3a3e58'} 
                  position={'relative'}
                  onMouseOver={() => setSelectedEvent(rowIdx)}
                  onMouseLeave={() => setSelectedEvent(null)}
                  {...row.getRowProps()}
                >

              {
                itemProps.map((prop, idx) => (
                  <TableCell key={`item-prop-${idx}`} flex={.45}>{item[prop]}</TableCell>
                ))
              }
              <TableCell flex ={.4} paddingRight={0}>
                { highlightedRow === idx ?
                  <>
                    <CustomTableOption
                      icon={EditIcon}
                      onClick={
                        (e: React.MouseEvent<HTMLDivElement>) => {
                          e.stopPropagation();
                          navigate(buildRoute(item, editRouteStructure));
                        } 
                      }
                    />
                    <CustomTableOption
                      icon={CrossIcon}
                      color={'danger'}
                      onClick={
                        (e: React.MouseEvent<HTMLDivElement>) => {
                          e.stopPropagation();
                          onDelete(userId, entityId, entityIdentifier);
                        } 
                      }
                    />
                  </> : ''
                }
              </TableCell>


                  {
                    row.cells.map((cell, idx) => {
                      return idx !== 3 ? (
                        <TableCell flex={getFlexValues(idx, row.cells.length)} {...cell.getCellProps()}>
                          {
                            <Text userSelect={'none'}> 
                              {cell.render('Cell')}
                            </Text>
                          }
                        </TableCell>
                      ) :
                        <Pane
                          ref={buttonsRef}
                          position={'absolute'}
                          display={selectedEvent === rowIdx ? 'flex' : 'none'}
                          width={100}
                          height={49}
                          right={0}
                          backgroundColor={'#F9FAFC'}
                        >
                          <CustomTableOption
                            icon={EditIcon}
                            onClick={() => {
                              const eventId = page[rowIdx].original.eventId;
                              setCurrentEvent(events.find(evt => evt.eventId === eventId) as AgendaEvent); // this can't be undefined
                              setDisplayEventForm(true);
                              setSelectedEvent(null);
                            }}
                          />
                          <CustomTableOption
                            icon={CrossIcon}
                            color={'danger'}
                            onClick={() => {
                              const eventId = page[rowIdx].original.eventId;
                              deleteEvent((events.find(evt => evt.eventId === eventId) as AgendaEvent).eventId)} // this can't be undefined
                            }
                          />
                        </Pane>
                    })
                  }
                </TableRow>
              )
            })
          } 
        </TableBody>
      </Table>*/
    <Table>
      <TableHead>
        {
          labels.map((label, idx) => {
            return (
              <TableHeaderCell key={`row-${idx}`} flex={1}>{ label }</TableHeaderCell>
            )
          })
        }
        <TableHeaderCell flex={.4}></TableHeaderCell>
      </TableHead>
      <TableBody ref={sourceListRef} height={tableRelativeHeight}>
        { source && source.map((item, idx) => {
          const itemKeys = Object.keys(item);
          const itemProps = itemKeys.filter(prop => !prop.includes('Id'));
          const entityIdentifier = itemKeys.find(key => key.includes('Id')) as string; //id is always present, if not then it is an error from the server side, same happems with entityId
          const entityId = item[entityIdentifier] as number;

          return (
            <TableRow
              display={'flex'}
              isSelectable
              onClick={
                detailRouteStructure ?
                  () => { navigate(buildRoute(item, detailRouteStructure)) } :
                  undefined
              }
              onMouseOver={ () => setHighlightedRow(idx) }
              onMouseLeave={ () => setHighlightedRow(null) }
              key={idx}
            >
              {
                itemProps.map((prop, idx) => (
                  <TableCell key={`item-prop-${idx}`} flex={.45}>{item[prop]}</TableCell>
                ))
              }
              <TableCell flex ={.4} paddingRight={0}>
                { highlightedRow === idx ?
                  <>
                    <CustomTableOption
                      icon={EditIcon}
                      onClick={
                        (e: React.MouseEvent<HTMLDivElement>) => {
                          e.stopPropagation();
                          navigate(buildRoute(item, editRouteStructure));
                        } 
                      }
                    />
                    <CustomTableOption
                      icon={CrossIcon}
                      color={'danger'}
                      onClick={
                        (e: React.MouseEvent<HTMLDivElement>) => {
                          e.stopPropagation();
                          onDelete(userId, entityId, entityIdentifier);
                        } 
                      }
                    />
                  </> : ''
                }
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  );
};

export default CustomTable;
