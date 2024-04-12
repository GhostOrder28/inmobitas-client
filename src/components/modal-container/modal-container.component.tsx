import React  from 'react';
import { Pane, Card, PaneOwnProps } from 'evergreen-ui';

type Props = {
  children: JSX.Element | JSX.Element[];
  width?: number;
  hideFn?: () => void;
} & PaneOwnProps;

const ModalContainer: React.FC<Props> = ({ children, hideFn, ...otherProps }) => {
  return (
    <Pane
      position={'fixed'}
      top={0} left={0}
      zIndex={9999}
      display={'flex'}
      justifyContent={'center'}
      alignItems={'center'}
      width={'100%'}
      height={'100vh'}
    >
      <Pane
        cursor={'pointer'}
        position={'fixed'}
        top={0} left={0}
        width={'100vw'}
        height={'100vh'}
        backgroundColor={'rgba(67, 90, 111, 0.7)'}
        zIndex={101}
        onClick={ hideFn }
      />
      <Card
        zIndex={102}
        elevation={4}
        backgroundColor={'white'}
        marginTop={-100}
        {...otherProps}
      >
        { children }
      </Card>
    </Pane>
  )
}

export default ModalContainer;
