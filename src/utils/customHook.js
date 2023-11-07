import React, {useState} from 'react';
import {Alert, Modal, StyleSheet, View} from 'react-native';

// Custom modal hook
export const usePopupModal = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const showModal = () => {
    setModalVisible(true);
  };

  const hideModal = () => {
    setModalVisible(false);
  };

  const ModalComponent = ({children}) => {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          hideModal();
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>{children}</View>
        </View>
      </Modal>
    );
  };

  return {showModal, hideModal, ModalComponent};
};

const styles = StyleSheet.create({
  centeredView: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#00000040',
  },
});
