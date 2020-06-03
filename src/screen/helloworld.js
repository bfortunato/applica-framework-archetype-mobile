import React from 'react';
import { View, Text } from 'react-native';
import styles from '../styles/helloworld'
import HelloWorldStore from "../stores/helloworld";
import {connect} from "../utils/aj-react";
import _ from "underscore";

export const HelloWorld = (props) => {

    return (
        <View style={styles.container}>            
            <Text style={{textAlign: "center", marginTop: 50}}>Hello world!</Text>
        </View>
      );
}

const stateMapper = (state) => ({

});

const actionsMapper = () => ({

})

export const HelloWorldContainer = connect(HelloWorld).to(HelloWorldStore, stateMapper, actionsMapper);