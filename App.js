import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import { useEffect, useState } from 'react'

export function App2() {

  const [access, setAccess] = useState(false);
  const setRenderFalse = ()=> setRender(false);
  const [accessFalse, setAccessFalse] = useState(false);


  useEffect(() => {
    (async () => {
      const authentication = await LocalAuthentication.authenticateAsync();
      if (authentication.success)
        setAccess(true)
      else
        setAccess(false)
    })();
  }, []);

  return (
    <View>
      {access && (
        <>
          <Text>
            Login feito com sucesso.
          </Text>
          <TouchableOpacity onPress={accessFalse}>
            <Text>
             Deslogar da aplicação.

            </Text>
          </TouchableOpacity>
        </> 
      )}
    </View>
  )
}

export default function App() {

  const [biometria, setBiometria] = useState(false);
  const [render, setRender] = useState(false);

  const changeRender = () => setRender(true)

  useEffect(() => {
    (async () => {
      const compativel = await LocalAuthentication.hasHardwareAsync();
      setBiometria(compativel);
    })();
  }, []);


  if (render) {
    return (
      <App2 />
    )

  } else {
    return (
      <View style={styles.container}>
        <Text>
          Faça Login com Biometria.
        </Text>
        <TouchableOpacity onPress={changeRender}>
          <Text>
            Fazer Login
          </Text>
        </TouchableOpacity>
        <StatusBar style="auto" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
