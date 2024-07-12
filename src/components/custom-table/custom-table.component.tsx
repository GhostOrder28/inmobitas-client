import React, { useEffect, useRef, useState, FC, useMemo } from "react";
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
  Text,
  Pane, 
  //Pagination
} from "evergreen-ui";
import { useTable, usePagination } from 'react-table';

import useRelativeHeight from '../../hooks/use-relative-height';
import useClientDevice from "../../hooks/use-client-device";
import useClickOutside from "../../hooks/use-click-outside";

import { buildRoute } from "../../utils/utility-functions/utility-functions";
import { CustomTableProps, CustomTableColumn, CustomTableRow } from './custom-table.types';
import CustomTableOption from './custom-table-option';
import http from '../../http/http';
import Pagination from '../pagination/pagination.component';
import { getPageSize } from "./custom-table.utils";
import ContentSpinner from "../content-spinner/content-spinner.component";
import { useTranslation } from "react-i18next";
import useWindowDimensions from "../../hooks/use-window-dimensions";
import { MOBILE_BREAKPOINT_VALUE } from "../../constants/breakpoints.consts";
import { MOBILE_COLUMN_COUNT } from "./custom-table.consts";

const CustomTable: FC<CustomTableProps> = ({ 
  source, 
  setSource, 
  labels, 
  detailRouteStructure, 
  editRouteStructure, 
  deleteBaseUrl,
  deleteMessage,
}) => {
  const navigate = useNavigate();
  const sourceListRef = useRef<HTMLDivElement | null>(null);
  const tableRelativeHeight = useRelativeHeight(sourceListRef);
  const userId = useSelector(selectCurrentUserId) as number;
  const [highlightedRow, setHighlightedRow] = useState<number | null>(null);
  const [timeoutId, setTimeoutId] = useState<ReturnType<typeof setTimeout>>();
  const buttonsRef = useRef(null);
  useClickOutside(buttonsRef, () => setHighlightedRow(null));
  const clientDevice = useClientDevice();
  const [ isLoading, setIsLoading ] = useState<boolean>(false);
  const { windowInnerWidth } = useWindowDimensions();

  const data = useMemo(() => source.map(item => {
    const itemKeys = Object.keys(item);
    return itemKeys.reduce((acc, curr) => {
      return { ...acc, [curr]: item[curr] }
    }, {})

  }), [source]);

  const columns: CustomTableColumn[] = useMemo(() => {
    if (source.length) {
      const itemKeys = Object.keys(source[0]);
      const itemProps = itemKeys.filter(prop => !prop.includes('Id'));
      
      const columnsArray = itemProps.map((prop, idx) => ({
        Header: labels[idx],
        accessor: prop
      }))
      if (windowInnerWidth > MOBILE_BREAKPOINT_VALUE) {
        return columnsArray;
      } else {
        return columnsArray.slice(0, MOBILE_COLUMN_COUNT);
      };
    } else {
      return [];
    }

  }, [ source, windowInnerWidth ])

  const tableInstance = useTable(
    { 
      columns, 
      data, 
      initialState: {
        pageIndex: 0,
      },
    }, 
    usePagination
  )

  const {
    getTableProps,
    headerGroups,
    prepareRow,
    page,
    pageCount,
    state,
    setPageSize,
    previousPage,
    nextPage,
    gotoPage,
  } = tableInstance;

  const onDelete = async (userId: number, entityId: number, entityIdentifier: string) => {
    setIsLoading(true)

    const deletedEntity = await http.delete(`${deleteBaseUrl}/${userId}/${entityId}`);
    const remainingEntities = source.filter(item => item[entityIdentifier] !== deletedEntity.data)
    setSource(remainingEntities);
    setHighlightedRow(null);

    setIsLoading(false);
  }

  useEffect(() => {
    if(tableRelativeHeight) {
      const pageSize = getPageSize(tableRelativeHeight, 64);
      if (pageSize > 0) setPageSize(pageSize);
    } 
  }, [tableRelativeHeight])

  const getFlexValues = (idx: number) => idx === columns.length - 1 ? .4 : .45;

  return (
    <Pane position='relative'>
      { isLoading ?
        <ContentSpinner waitMessage={ deleteMessage } /> : ''
      }
      <Table flex={1} {...getTableProps()}>
        <TableHead display={'flex'} userSelect={'none'}>
          {
            headerGroups.map(headerGroup => (
              headerGroup.headers.map((column, idx) => (
                <TableHeaderCell flex={.45} {...column.getHeaderProps()}>
                  {
                    column.render('Header')
                  }
                </TableHeaderCell>
              ))
            )) 
          }
          <TableHeaderCell flex={.3} />
        </TableHead>
        <TableBody ref={sourceListRef} height={tableRelativeHeight}>
          {
            page.map((row: CustomTableRow, rowIdx) => {
              const rowKeys = Object.keys(row.original);
              const entityIdentifier = rowKeys.find(key => key.includes('Id')) as string; //id is always present, if not then it is an error from the server side, same happems with entityId;
              prepareRow(row)
              return (
                <TableRow
                  isHighlighted={highlightedRow === rowIdx ? true : false}
                  color={'#3a3e58'} 
                  display={'flex'}
                  cursor={'pointer'}
                  onMouseOver={ clientDevice === 'desktop' ? () => setHighlightedRow(rowIdx) : undefined }
                  onMouseLeave={ clientDevice === 'desktop' ? () => setHighlightedRow(null) : undefined }
                  onTouchStart={ clientDevice === 'touchscreen' ? () => {
                    setTimeoutId(setTimeout(() => setHighlightedRow(rowIdx), 500))
                  } : undefined }
                  onTouchEnd={ clientDevice === 'touchscreen' ? () => {
                    clearTimeout(timeoutId)
                  } : undefined }
                  onTouchMove={ clientDevice === 'touchscreen' ? () => {
                    clearTimeout(timeoutId)
                  } : undefined }
                  onClick={() => {
                    if (clientDevice === 'touchscreen') {
                      highlightedRow ? setHighlightedRow(null) : navigate(buildRoute(source[rowIdx], detailRouteStructure))
                    } else {
                      navigate(buildRoute(page[rowIdx], detailRouteStructure))
                    }
                   }}
                   {...row.getRowProps()}
                >
                  {
                    row.cells.map((cell, idx) => (
                      <TableCell
                        key={`item-prop-${idx}`} 
                        flex={.45}
                        paddingX={idx === row.cells.length - 1 ? 0 : 12}
                      > 
                        {
                          <Text>{ cell.render('Cell') }</Text> 
                        }
                      </TableCell>
                    ))
                  }
                  <TableCell
                    flex={.3}
                    paddingX={0}
                  >
                    { rowIdx === highlightedRow &&
                      <Pane ref={buttonsRef} display={'flex'} width={'100%'} height={'100%'}>
                        <CustomTableOption
                          icon={EditIcon}
                          onClick={
                            (e: React.MouseEvent<HTMLDivElement>) => {
                              e.stopPropagation();
                              navigate(buildRoute(page[rowIdx], editRouteStructure));
                            } 
                          }
                        />
                        <CustomTableOption
                          icon={CrossIcon}
                          color={'danger'}
                          onClick={
                            (e: React.MouseEvent<HTMLDivElement>) => {
                              e.stopPropagation();
                              onDelete(userId, row.original[entityIdentifier], entityIdentifier);
                            } 
                          }
                        />
                      </Pane>
                    }
                  </TableCell>                  
                </TableRow>
              )
            })
          } 
        </TableBody>
      </Table>
      <Pane
        width={'100%'}
        display={'flex'}
        justifyContent={'center'}
      >
        <Pagination
          page={state.pageIndex + 1} 
          totalPages={pageCount}
          onNextPage={nextPage}
          onPreviousPage={previousPage}
          onPageChange={page => gotoPage(page - 1)}
        />
      </Pane>
    </Pane>
  );
};

export default CustomTable;
