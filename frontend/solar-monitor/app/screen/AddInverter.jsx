import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { CameraView, Camera } from "expo-camera/next";
import Colors from "../../assets/Colors";

export default function AddInverter() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getCameraPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <CameraView
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ["qr", "pdf417"],
        }}
        style={StyleSheet.absoluteFillObject}

        
      />
      <View style={[styles.border,
       {
        width:  250,
        height:  250, 
      },
      ]}>
       <View style={[styles.corner, styles.topLeft]} />
        <View style={[styles.corner, styles.topRight]} />
        <View style={[styles.corner, styles.bottomLeft]} />
        <View style={[styles.corner, styles.bottomRight]} />
       </View>
      <View style={styles.overlay}>
        <Text style={styles.textOverlay}>Solis - Product</Text>
        <Text style={styles.textOverlay}>Scan the QR Code</Text>
      </View>
      

      {scanned && (
        <Button title={"Tap to Scan Again"} onPress={() => setScanned(false)} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center", 
    alignItems: 'center', 
  },
  overlay: {
    position: 'absolute',
    top : 90,
    justifyContent : 'center',
    alignItems: 'center',

  },
  textOverlay: {
    color: Colors.WHITE, 
    fontSize: 30, 
    fontFamily: 'pop-regular', 
  },
  corner: {
    width: 60, 
    height: 60, 
    borderWidth: 5,
    borderColor: Colors.YELLOW_LIGHT,
    position: 'absolute',
    borderRadius: 2
  },
  topLeft: {
    top: -1,
    left: -1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  topRight: {
    top: -1,
    right: -1,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
  },
  bottomLeft: {
    bottom: -1,
    left: -1,
    borderRightWidth: 0,
    borderTopWidth: 0,
  },
  bottomRight: {
    bottom: -2,
    right: -1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  border: {
    width: 200,
    height: 200,
    borderWidth: 0,
    borderRadius: 10,
    borderColor: 'gray',
    position: 'relative',
  },
});
