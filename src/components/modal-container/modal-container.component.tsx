import React  from 'react';
import { Pane, Card, PaneOwnProps } from 'evergreen-ui';

type Props = {
  displayFn: React.Dispatch<React.SetStateAction<boolean>>;
  children: JSX.Element | JSX.Element[];
  width?: number;
} & PaneOwnProps;

const ModalContainer: React.FC<Props> = ({ displayFn, children, ...otherProps }) => {
  return (
    <Pane
      position={'fixed'}
      top={0} left={0}
      zIndex={100}
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
      />
      <Card
        zIndex={102}
        elevation={4}
        backgroundColor={'white'}
        {...otherProps}
      >
        { children }
      </Card>
    </Pane>
  )
}

export default ModalContainer;
