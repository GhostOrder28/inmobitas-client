import * as userSelectors from './user.selectors';
import { RootState } from "../root-reducer";
import { UserState } from './user.reducer';
import { AxiosError } from 'axios';

describe('user selectors', () => {

  const user: UserState = {
    currentUser: {
      names: 'test',
      userId: 1,
      oauthId: 41313541345
    },
    guestPending: false,
    errors: { response: 'there is an error' } as any as AxiosError
  }

  it('selectUserReducer', () => {
    const storeMock = {
      user: {
        currentUser: {},
        errors: null
      }
    }
    const userReducer = userSelectors.selectUserReducer(storeMock as RootState);
    expect(userReducer).toEqual(storeMock.user)
  })  

  it('selectCurrentUser', () => {
    const currentUser = userSelectors.selectCurrentUser({ user } as RootState);
    expect(currentUser).toEqual(user.currentUser)
  })  

  it('selectErrorObj', () => {
    const userErrors = userSelectors.selectErrorObj({ user } as RootState);
    expect(userErrors).toEqual(user.errors)
  })

  it('selectCurrentUserId', () => {
    const currentUserId = userSelectors.selectCurrentUserId({ user } as RootState);
    expect(currentUserId).toEqual(1)
  });

})
