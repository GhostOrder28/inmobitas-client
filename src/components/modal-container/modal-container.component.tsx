import React, { useEffect, useRef } from 'react';
import { Pane, PaneOwnProps } from 'evergreen-ui';

type Props = {
  displayFn: React.Dispatch<React.SetStateAction<boolean>>;
  children: JSX.Element | JSX.Element[];
  width?: number;
} & PaneOwnProps;

const ModalContainer: React.FC<Props> = ({ displayFn, children, ...otherProps }) => {
  console.log(otherProps)

  const componentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
  console.log(componentRef)
    const handleClickOutside = (event: MouseEvent) => {
      console.log('clicked!')
      console.log(event.target)
      if (
          componentRef.current &&
          !componentRef.current.contains(event.target as Node)
        ) {
        
        displayFn(false) ;
      }
    }
    document.addEventListener('click', handleClickOutside, true)
    return () => {
      document.removeEventListener('click', handleClickOutside, true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
        backgroundColor={'white'}
        opacity={.7}
        zIndex={101}
      />
      <Pane
        ref={componentRef}
        zIndex={102}
        width={otherProps.width || 350}
        padding={20}
        elevation={3}
        backgroundColor={'white'}
        {...otherProps}
      >
        { children }
      </Pane>
    </Pane>
  )
}

export default ModalContainer;
