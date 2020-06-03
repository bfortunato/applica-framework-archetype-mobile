import {Alert} from "react-native";
import Toast from "react-native-root-toast";
import Loader from "../components/loader";
import _ from "underscore";
import * as aj from "../aj";
import M from "../strings";

exports.Alert = {
    alert(data, callback = () => {}) {
        Alert.alert(
            data.title,
            data.message,
            [
              {text: 'OK', onPress: callback},
            ],
          );
        
    },

    confirm(data, callback = () => {}) {
        Alert.alert(
            data.title,
            data.message,
            [
                {text: M("cancel"), onPress: () => callback(false, false)},
                {text: "OK", onPress: () => callback(false, true)},
            ],
            {cancelable: false},
          );
    }
}

let loaderCount = 0;
let unobtrusiveLoaderCount = 0;

exports.Loader = {
    show(data, callback) {
        loaderCount++
        Loader.show(data.message || "");
    },

    hide(data, callback) {
        loaderCount--
        if (loaderCount <= 0) {
            Loader.hide();

            loaderCount = 0
        }
    },

    showUnobtrusive(data, callback) {
        unobtrusiveLoaderCount++
    },

    hideUnobtrusive(data, callback) {
        unobtrusiveLoaderCount--;
        if (unobtrusiveLoaderCount <= 0) {
        }
    }
}

exports.Toast = {
    show(data, callback) {
        Toast.show(data.message, Toast.durations.SHORT);
        
    }
}

exports.register = function() {
    aj.registerPlugin("Alert", exports.Alert);
    aj.registerPlugin("Toast", exports.Toast);
    aj.registerPlugin("Loader", exports.Loader);
}

