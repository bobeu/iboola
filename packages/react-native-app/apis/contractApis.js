/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
// import { SafeAreaProvider } from "react-native-safe-area-context";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import {
// 	NavigationContainer,
// 	DefaultTheme,
// 	DarkTheme,
// } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import * as React from "react";
// import { ColorSchemeName, Button } from "react-native";
import { useWalletConnect } from "@walletconnect/react-native-dapp";
import Web3 from "web3";
// import Colors from "../constants/Colors";
// import useColorScheme from "../hooks/useColorScheme";
// import ModalScreen from "../screens/ModalScreen";
// import NotFoundScreen from "../screens/NotFoundScreen";
// import { RootStackParamList, RootTabParamList } from "../types";
// import LinkingConfiguration from "./LinkingConfiguration";
// import LoginScreen from "../screens/LoginScreen";
// import Greeter from "../screens/Greeter";
// import Storage from "../screens/Storage";
// import deployedContracts from "@iboola-react-native/packages/hardhat/deployments/alfajores/IBoolaContractV.json";
import deployedContracts from "@celo-composer/hardhat/deployments/hardhat_contracts.json";
import Account from "../screens/Account";
const web3 = new Web3("https://alfajores-forno.celo-testnet.org");
// const connector = useWalletConnect();

const contracts = deployedContracts["44787"]?.["alfajores"]?.contracts.IBoolaContractV;
const address = contracts.address;
const instance = contracts ? new web3.eth.Contract(contracts.abi, address) : null;

export const contractsInfo = {
	signUpAsWasteCollector: async(_callback, wasteInput, connector) => {
		_callback(true);
		try {
			let txData = await instance?.methods
				.generateWaste(wasteInput)
				.encodeABI();
			await connector?.sendTransaction({
				from: connector?.currentUser,
				to: address,
				data: txData,
			});
		} catch (e) {
			console.log(e);
		} finally {
			_callback(false);
		}
	},
	registerBin: async,

	recycleWaste: async (_callback, wasteInput, connector, binIDInput, wasteIDInput) => {
		_callback(true);
		try {
			let txData = await instance?.methods
				.recycle(binIDInput, wasteIDInput)
				.encodeABI();

			await connector.sendTransaction({
				from: connector?.currentUser,
				to: address,
				data: txData,
			});
		} catch (e) {
			console.log(e);
		} finally {
			_callback(false);
		}
	},
	
	registerBin: async (_callback, connector) => {
		_callback(true);
		try {
			let txData = await instance?.methods
				.addNewBin()
				.encodeABI();

			await connector.sendTransaction({
				from: connector?.currentUser,
				to: address,
				data: txData,
			});
		} catch (e) {
			console.log(e);
		} finally {
			_callback(false);
		}
	},
	getProfile : async (_callback, setProfileInformation) => {
    _callback(true);
    try {
      const result = await instance?.methods
				.profile(0, connector?.currentUser)
				.call();
      setProfileInformation(result);
    } catch (e) {
      console.log(e);
    } finally {
      _callback(false);
    }
  },
	getRegisteredBins: async(_callback, setBins) => {
    _callback(true);
    try {
      const result = (await instance?.methods
					.bins()
					.call());
      setBins(result);
    } catch (e) {
      // console.log(e);
    } finally {
      _callback(false);
    }
  },

}
