import * as redux from 'react-redux';
import Signup from './signup.component';
import { render, screen } from '@testing-library/react';

jest.mock('react-i18next', () => ({
  useTranslation: () => {
    return {
      t: (str: string) => str,
      i18n: {
        changeLanguage: () => new Promise(() => {}),
      },
    };
  },
}));

const store = {
  currentUser: {
    email: 'test@test.com',
    names: 'Test',
    userId: 1
  },
  errors: null
}


describe('Signup', () => {
  let spyOnUseSelector;
  let spyOnUseDispatch;
  let mockDispatch;
  beforeEach(() => {
    spyOnUseSelector = jest.spyOn(redux, 'useSelector');
    spyOnUseSelector.mockReturnValue({
      email: 'test@test.com',
      names: 'Test',
      userId: 1
    });

    spyOnUseDispatch = jest.spyOn(redux, 'useDispatch');
    mockDispatch = jest.fn();
    spyOnUseDispatch.mockReturnValue(mockDispatch);

  });


  it('renders Signup component', () => {
    expect(render(<Signup />)).toMatchSnapshot();
  })
})

