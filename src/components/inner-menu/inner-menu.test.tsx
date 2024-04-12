import React from 'react';
import { render, screen } from '@testing-library/react';
import InnerMenu from './inner-menu.component';
import {
  Pane,
  TrashIcon,
  CrossIcon,
} from 'evergreen-ui';
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

  // it('should render DatePicker', () => {
  //   const wrapper = render(
  //     <InnerMenu
  //       menuMode={null}
  //       submitDeletion={() => Promise.resolve()}
  //       setMenuMode={useStateMock(null)[0]}
  //       setMarkedItems={useStateMock(false)[0]}
  //     />
  //
  //   )
  //   expect(wrapper).toMatchSnapshot();
  // });

  // it('height should be 0rem', () => {
  //   render(
  //     <InnerMenu
  //       menuMode={null}
  //       submitDeletion={() => Promise.resolve()}
  //       setMenuMode={useStateMock(null)[0]}
  //       setMarkedItems={useStateMock(false)[0]}
  //     >
  //       <Pane
  //         display={"flex"}
  //         justifyContent={"center"}
  //         alignItems={"center"}
  //         width={"100%"}
  //         height={"100%"}
  //         flex={1}
  //         cursor={"pointer"}
  //         onClick={ () => submitDeletion('pictures') }
  //       >
  //         <TrashIcon size={majorScale(3)} color={"#3A3E58"} />
  //       </Pane>
  //       <Pane
  //         display={"flex"}
  //         justifyContent={"center"}
  //         alignItems={"center"}
  //         width={"100%"}
  //         height={"100%"}
  //         flex={1}
  //         cursor={"pointer"}
  //         onClick={() => {
  //           setMarkedItems([]);
  //           setMenuMode(null);
  //         }}
  //       >
  //         <CrossIcon size={23} color={"#3A3E58"} />
  //       </Pane>
  //     </InnerMenu>
  //   )
  //   const deletionPanelContainer = screen.queryByTestId('deletion-panel-container');
  //   expect(deletionPanelContainer).toHaveStyle({ height: '0rem' })
  //
  // })

  // it('height should be 2.2rem', () => {
  //   render(
  //     <InnerMenu
  //       menuMode={'pictures'}
  //       submitDeletion={() => Promise.resolve()}
  //       setMenuMode={useStateMock(null)[0]}
  //       setMarkedItems={useStateMock(false)[0]}
  //     />
  //   )
  //   const deletionPanelContainer = screen.queryByTestId('deletion-panel-container');
  //   expect(deletionPanelContainer).toHaveStyle({ height: '2.2rem' })
  // });

  it('should hide the component (height to 0rem)', () => {
    
  });

})

