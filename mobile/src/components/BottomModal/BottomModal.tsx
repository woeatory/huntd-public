import React, { FC, Ref } from 'react';
import { Portal } from 'react-native-portalize';
import { Modalize } from 'react-native-modalize';
import { IProps } from 'react-native-modalize/lib/options';

interface Props extends IProps {
  modalRef: Ref<Modalize>;
  portal?: boolean;
}

export const BottomModal: FC<Props> = (props) => {
  const { portal = false, children, modalRef } = props;

  if (portal) {
    return (
      <Portal>
        <Modalize
          handlePosition="inside"
          adjustToContentHeight
          ref={modalRef}
        >
          {children}
        </Modalize>
      </Portal>
    );
  }

  return (
    <Modalize
      handlePosition="inside"
      adjustToContentHeight
      ref={modalRef}
    >
      {children}
    </Modalize>
  );
};
