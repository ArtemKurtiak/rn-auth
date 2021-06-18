import React from 'react';
import {
    View,
    Text,
    Button
} from 'react-native';

import auth, {firebase} from '@react-native-firebase/auth';
import {LoginManager, AccessToken} from 'react-native-fbsdk';

const firebaseConfig = {
    apiKey: "AIzaSyB2HcRMWTI9PuEdFubEUocAvYoYSDv7L84",
    authDomain: "rnauth-b3c98.firebaseapp.com",
    projectId: "rnauth-b3c98",
    storageBucket: "rnauth-b3c98.appspot.com",
    messagingSenderId: "268582959124",
    appId: "1:268582959124:web:56e8370d990a63acc9cf01",
    measurementId: "G-CJWCN26EGE",
    databaseURL: ''
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


const App = () => {

    async function onFacebookButtonPress() {
        // Attempt login with permissions
        const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

        if (result.isCancelled) {
            throw 'User cancelled the login process';
        }

        // Once signed in, get the users AccesToken
        const data = await AccessToken.getCurrentAccessToken();

        if (!data) {
            throw 'Something went wrong obtaining access token';
        }

        // Create a Firebase credential with the AccessToken
        const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);

        // Sign-in the user with the credential
        return auth().signInWithCredential(facebookCredential);
    }

    return <View>
        <Button
            title="Facebook Sign-In"
            onPress={() => onFacebookButtonPress().then(() => console.log('Signed in with Facebook!'))}
        />
    </View>
}

export default App;