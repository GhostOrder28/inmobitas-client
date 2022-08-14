import React, { FC } from 'react';
import { Pane, IconComponent } from 'evergreen-ui';

type CustomTableOptionProps = {
  icon: IconComponent;
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
  color?: string;
}

const CustomTableOption: FC<CustomTableOptionProps> = ({ icon: Icon, onClick, color }) => (
  <Pane
    flex={1}
    display={'flex'}
    justifyContent={'center'}
    alignItems={'center'}
    borderLeft={'1px solid #EDEFF5'}
    onClick={onClick}
    height={'100%'}
    width={'100%'}
  >
    <Icon color={color} />
  </Pane>

)

export default CustomTableOption;
