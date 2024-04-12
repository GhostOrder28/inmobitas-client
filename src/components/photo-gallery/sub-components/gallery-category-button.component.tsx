import React, { FC, ReactNode } from 'react';
import { Pane, IconComponent } from 'evergreen-ui';

type GalleryCategoryButtonProps = {
  icon?: IconComponent;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  color?: string;
  borderColor?: string;
  size?: string | number;
  upload?: ReactNode
}

const GalleryCategoryButton: FC<GalleryCategoryButtonProps> = ({ icon: Icon, onClick, color, borderColor, size, upload }) => (
  <Pane
    flex={1}
    display={'flex'}
    justifyContent={'center'}
    alignItems={'center'}
    borderLeft={`1px solid ${borderColor || '#EDEFF5'}`}
    onClick={ !upload ? onClick : undefined }
    height={ size || '100%' }
    width={ size || '100%' }
    cursor="pointer"
  >
    { upload || Icon && <Icon color={color} /> }
  </Pane>

)

export default GalleryCategoryButton;
