import { ThemedText } from "@/components/themed-text";
import React from "react";
import { Button, Dimensions, StyleSheet, View } from "react-native";
import Modal from "react-native-modal";

type ModalComponentProps = {
  isVisible: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
  onConfirm?: () => void;
  confirmText?: string;
  cancelText?: string;
};

export const ModalComponent: React.FC<ModalComponentProps> = ({ isVisible, onClose, title, message, onConfirm, confirmText = "Yes", cancelText = "No" }) => {
  const { width } = Dimensions.get("window");

  return (
    <Modal isVisible={isVisible} onBackdropPress={onClose} style={styles.modal} backdropOpacity={0.3}>
      <View style={[styles.container, { width: width * 0.85 }]}>
        {title && <ThemedText type="title">{title}</ThemedText>}
        {message && <ThemedText type="body">{message}</ThemedText>}

        <View style={styles.buttons}>
          {onConfirm ? (
            <>
              <Button title={cancelText} onPress={onClose} />
              <Button title={confirmText} onPress={onConfirm} />
            </>
          ) : (
            <Button title="OK" onPress={onClose} />
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: "center",
    alignItems: "center",
    margin: 0,
  },
  container: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 20,
    alignItems: "center",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 15,
  },
});
