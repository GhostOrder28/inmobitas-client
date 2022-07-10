import React from 'react';
import { render, screen } from '@testing-library/react';
import DeletionPanel from './deletion-panel.component';
import '@testing-library/jest-dom'

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

describe('DeletionPanel', () => {
  const setStateMock = jest.fn();
  const useStateMock: any = (useState: any) => [useState, setStateMock];
  jest.spyOn(React, 'useState').mockImplementation(useStateMock);

  it('should render DatePicker', () => { 
    const wrapper = render(
      <DeletionPanel
        showDeletionMenu={false}
        submitDeletion={() => Promise.resolve()}
        setShowDeletionMenu={useStateMock(false)[0]}
        setMarkedPictures={useStateMock(false)[0]}
      />
    )
    expect(wrapper).toMatchSnapshot();
  });

  it('height should be 0rem', () => {
    render(
      <DeletionPanel
        showDeletionMenu={false}
        submitDeletion={() => Promise.resolve()}
        setShowDeletionMenu={useStateMock(false)[0]}
        setMarkedPictures={useStateMock(false)[0]}
      />
    )
    const deletionPanelContainer = screen.queryByTestId('deletion-panel-container');
    expect(deletionPanelContainer).toHaveStyle({ height: '0rem' })

  })

  it('height should be 2.2rem', () => {
    render(
      <DeletionPanel
        showDeletionMenu={true}
        submitDeletion={() => Promise.resolve()}
        setShowDeletionMenu={useStateMock(false)[0]}
        setMarkedPictures={useStateMock(false)[0]}
      />
    )
    const deletionPanelContainer = screen.queryByTestId('deletion-panel-container');
    expect(deletionPanelContainer).toHaveStyle({ height: '2.2rem' })
  });

  it('should hide the component (height to 0rem)', () => {
    
  });

})

