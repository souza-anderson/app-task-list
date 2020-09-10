import { StatusBar } from 'expo-status-bar';
import { AppLoading } from 'expo';
import React, { useState } from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, ScrollView, Alert } from 'react-native';
import imageBackgroundHeader from './assets/bg.jpg';

import { AntDesign } from '@expo/vector-icons';
import { useFonts, Lato_400Regular } from '@expo-google-fonts/lato';

export default function App() {

  const [tasks, setTasks] = useState(
    [
      {
        id: 1,
        task: 'Minha tarefa 1'
      },
      {
        id: 2,
        task: 'Minha tarefa 2'
      },
      {
        id: 3,
        task: 'Minha tarefa 3'
      }
    ]
  );

  let [fontsLoaded] = useFonts({
    Lato_400Regular
  });


  const deleteTask = id => {

    let newTasks = tasks.filter((task) => {
      return task.id !== id;
    });

    setTasks(newTasks);

    Alert.alert(`A tarefa de id ${id} foi deletada com sucesso!`);
  }

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <ScrollView style={{flex: 1}}>
        <StatusBar style='light'></StatusBar>
        <ImageBackground source={imageBackgroundHeader} style={styles.image}>
          <View style={styles.header}>
            <Text style={styles.textHeader}>Lista de Tarefas</Text>
          </View>
        </ImageBackground>

        

        {          
          tasks.map(task => {
            return (
              <View style={styles.singleTask}>
                <View style={{flex: 1, padding: 10}}>
                  <Text>{task.task}</Text>
                </View>

                <View style={{flex: 1, justifyContent: 'center', alignItems: 'flex-end', padding: 10}}>
                  <TouchableOpacity onPress={() => deleteTask(task.id)}>
                    <AntDesign name="minuscircleo" size={24} color="black" />
                  </TouchableOpacity>
                </View>
              </View>
            );
          })  
        }
      </ScrollView>

    );
  }



}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 80,
    resizeMode: 'cover'
  },

  header: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center'
  },

  textHeader: {
    fontSize: 25,
    color: 'white',
    fontFamily: 'Lato_400Regular'
  },

  singleTask: {
    width: '100%',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    flexDirection: 'row',
    paddingBottom: 10,
    paddingTop: 10,
    justifyContent: 'center'
  }
})

