import http from "../../http/http"
import { store } from "../../redux/redux-store"
import { selectCurrentUserId } from "../../redux/user/user.selectors"
import { Entity } from "../../types/global.types"

const deleteItem = async (entity: Entity, entityId: number) => {
  const userId = selectCurrentUserId(store.getState());

  const deletedEntity = await http.delete(`${entity}s/${userId}/${entityId}`);

  return deletedEntity;
}

export {
  deleteItem
}
