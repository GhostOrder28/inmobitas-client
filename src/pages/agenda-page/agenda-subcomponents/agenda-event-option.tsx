import React, { FC } from 'react';
import { Pane, IconComponent, IconOwnProps } from 'evergreen-ui';

type EventOptionProps = {
  icon: IconComponent;
  onClick: () => void;
} & IconOwnProps;

const EventOption: FC<EventOptionProps> = ({ icon: Icon, onClick, color }) => (
  <Pane
    flex={1}
    display={'flex'}
    justifyContent={'center'}
    alignItems={'center'}
    borderLeft={'1px solid #EDEFF5'}
    onClick={onClick}
  >
    <Icon color={color} />
  </Pane>

)

export default EventOption;
