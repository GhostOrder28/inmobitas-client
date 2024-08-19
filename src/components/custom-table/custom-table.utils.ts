import { Dispatch, SetStateAction } from "react";
import { Entity } from "../../types/global.types";
import { CustomTableRow } from "./custom-table.types";
import { store } from "../../redux/redux-store";
import { setIsLoading, unsetIsLoading } from "../../redux/app/app.actions";
import { deleteItem } from "./custom-table.api";

const { dispatch } = store;

const getPageSize = (tableHeight: number, itemHeight: number) => {
  //console.log(tableHeight)
  const pageSize = Math.floor(tableHeight / itemHeight);
  return pageSize;
}

const getItemUrl = (entity: Entity, row: CustomTableRow, page: "edit" | "info") => {
  const { original } = row;
  const baseUrl = `/client/${original.clientId}`;

  if (entity === "listing") {
    const listingId = original["estateId"];
    return baseUrl + `/${entity}/${listingId}/${page}`;
  } else {
    return `${baseUrl}/${page}`;
  };
};

const handleDeleteItem = async (
  entity: Entity,
  row: CustomTableRow, 
  msg: string,
  setSource: Dispatch<SetStateAction<any[]>>
) => {
  const { original } = row;
  const entityIdKey = entity === "listing" ? "estateId" : `${entity}Id`;
  const entityId: number = original[entityIdKey];

  dispatch(setIsLoading(msg))

  const { data: deletedEntityId } = await deleteItem(entity, entityId)
  setSource(prev => prev.filter(item => item[entityIdKey] !== deletedEntityId))

  dispatch(unsetIsLoading())
}

export {
  getPageSize,
  getItemUrl,
  handleDeleteItem,
}
