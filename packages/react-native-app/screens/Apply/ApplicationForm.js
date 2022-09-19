import {
  Animated,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import Header from "../../components/Header";
import { COLORS, FONTS, assets } from "../../constant";
import Button from "../../components/Button";
import Modal from "react-native-modal";
import { AntDesign } from "@expo/vector-icons";


import { useWalletConnect } from "@walletconnect/react-native-dapp";
import { contractsInfo } from "../../apis/contractApis";// <====
/**
 * 
 * @dev Since user will apply for smart bin, the api to call is self-descriptive
 *      just make the user call 
 *                              `await contractsInfo.registerBin()`
 * 
 *                      @Note All functions in the apis are asynchronous. 
 *                            So, be sure to use `await` keyword inside an
 *                            async function.
 *  @param {_callback, connector}
 *      o _callback - Function to call before the api runs. i.e 
 *                    whileapiRunning(). This function will be called before the api runs
 *                                       with 'true' value. After the api success, it is called again with 
 *                                       `false` value.
 *      o connector  - This is an object, being a return value from calling "useWalletConnect()" hook
 *                      and should be called inside the body of a component.
 *                      See how it is used on line 50. 
 *  
 *      o It accepts parameters.
 *      o Be sure to check which of them accepts parameters.
 *      o Create form to accept value from user. Then supply the parameter to the 
 *          function.
 * 
 *     Example: await contractsInfo.registerBin(_callback, connector);
 * 
 * 
 */


const ModalPoup = ({ visible, children }) => {
  const [showModal, setShowModal] = React.useState(visible);
  const scaleValue = React.useRef(new Animated.Value(0)).current;

	const connector = useWalletConnect();
  
  React.useEffect(() => {
    toggleModal();
  }, [visible]);
  const toggleModal = () => {
    if (visible) {
      setShowModal(true);
      Animated.spring(scaleValue, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      setTimeout(() => setShowModal(false), 200);
      Animated.timing(scaleValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };
  return (
    <Modal transparent visible={showModal}>
      <View style={styles.modalBackGround}>
        <Animated.View
          style={[
            styles.modalContainer,
            { transform: [{ scale: scaleValue }] },
          ]}
        >
          {children}
        </Animated.View>
      </View>
    </Modal>
  );
};

const ApplicationForm = () => {
  const [visible, setVisible] = React.useState(false);
  return (
    <SafeAreaView style={{ flex: 1, alignItems: "center" }}>
      <ModalPoup visible={visible}>
        <View style={{ alignItems: "center" }}>
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => setVisible(false)}
              style={{
                backgroundColor: "lightgray",
                borderRadius: 15,
                padding: 5,
              }}
            >
              <AntDesign name="close" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <View>
            <Image
              source={require("../../assets/images/confetti.jpeg")}
              style={{ height: 100, width: 100 }}
            />
          </View>
        </View>
        <Text
          style={{
            marginVertical: 10,
            fontSize: 20,
            textAlign: "center",
            fontFamily: FONTS.bold,
          }}
        >
          Congratulations!
        </Text>
        <Text
          style={{
            marginVertical: 10,
            fontSize: 20,
            textAlign: "center",
            fontFamily: FONTS.regular,
          }}
        >
          Thank you for applying
        </Text>
        <Text
          style={{
            marginVertical: 10,
            fontSize: 20,
            textAlign: "center",
            fontFamily: FONTS.light,
          }}
        >
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
        </Text>
        <Button action="OK" />
      </ModalPoup>
      <View style={{ width: "100%" }}>
        <Header title="Application" />
      </View>
      <View
        style={{
          paddingVertical: "5%",
          paddingHorizontal: "5%",
          width: "100%",
        }}
      >
        <Text style={{ fontSize: 32, fontFamily: FONTS.regular }}>
          Smart Waste Bin
        </Text>
      </View>
      <View
        style={{
          paddingVertical: "2%",
          paddingHorizontal: "5%",
          textAlign: "justify",
        }}
      >
        <Text tyle={{ fontSize: 12, fontFamily: FONTS.regular }}>
          Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean
          vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat
          vitae, eleifend ac, enim.
        </Text>
      </View>

      <View
        style={{
          paddingVertical: "5%",
          width: "100%",
          paddingHorizontal: "5%",
        }}
      >
        <Text
          style={{
            fontWeight: "300",
            fontSize: 12,
            lineHeight: 20,
            fontFamily: FONTS.regular,
            paddingBottom: "1%",
          }}
        >
          FARM/MARKET LOCATION
        </Text>
        <View style={{ flexDirection: "row", paddingVertical: "5%" }}>
          <TextInput
            placeholder="Garki Abuja"
            style={{
              borderBottomWidth: 1,
              borderColor: COLORS.gray,
              flex: 1,
            }}
          />
        </View>
      </View>

      <View
        style={{
          paddingVertical: "5%",
          width: "100%",
          paddingHorizontal: "5%",
        }}
      >
        <Text
          style={{
            fontWeight: "300",
            fontSize: 12,
            lineHeight: 20,
            fontFamily: FONTS.regular,
            paddingBottom: "1%",
          }}
        >
          FARM/MARKET ADDRESS
        </Text>
        <View style={{ flexDirection: "row", paddingVertical: "5%" }}>
          <TextInput
            placeholder="Block 62, Line 2, Garki Market"
            style={{
              borderBottomWidth: 1,
              borderColor: COLORS.gray,
              flex: 1,
            }}
          />
        </View>
      </View>
      <Button action="OK" onPress={() => setVisible(true)} />
    </SafeAreaView>
  );
};

export default ApplicationForm;

const styles = StyleSheet.create({
  modalBackGround: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContainer: {
    width: "90%",
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 20,
    elevation: 20,
    height: "60%",
  },
  header: {
    width: "100%",
    height: 40,
    alignItems: "flex-end",
    justifyContent: "center",
  },
});
