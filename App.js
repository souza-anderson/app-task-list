import { StatusBar } from 'expo-status-bar';
import { AppLoading } from 'expo';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, ScrollView, Alert, Modal, TouchableHighlight, TextInput, LogBox, AsyncStorage } from 'react-native';
import imageBackgroundHeader from './assets/bg.jpg';

import { AntDesign } from '@expo/vector-icons';
import { useFonts, Lato_400Regular } from '@expo-google-fonts/lato';

export default function App() {

  useEffect((() => {    
    (async () => {
      try {
        let savedTasks = await AsyncStorage.getItem('task');
        if (savedTasks == null) {
          setTasks([]);
        } else {
          setTasks(JSON.parse(savedTasks));
        }
      } catch (error) {
        alert('Task list data error!')
      }
    })();
  }), []);

  console.disableYellowBox = true;

  const [tasks, setTasks] = useState([]);
  const [modal, setModal] = useState(false);
  const [task, setTask] = useState('');

  let [fontsLoaded] = useFonts({
    Lato_400Regular
  });

  const addTask = () => {    
    let id = 0;

    if (tasks.length > 0) {
      id = tasks[tasks.length - 1].id + 1;
    }

    const actuallyTask = {
      id: id,
      task: task
    }

    setTasks([...tasks, actuallyTask]);
    setTask('');

    (async () => {
      try {
        await AsyncStorage.setItem('task', JSON.stringify([...tasks, actuallyTask]));
      } catch (error) {
        Alert.alert('Save data error');
      }}
    )();


    setModal(!modal);
  }


  const deleteTask = id => {

    let newTasks = tasks.filter((task) => {
      return task.id !== id;
    });

    setTasks(newTasks);

    (async () => {
      try {
        await AsyncStorage.setItem('task', JSON.stringify(newTasks));
      } catch (error) {
        Alert.alert('Save data error');
      }}
    )();

    Alert.alert('Tarefa deletado com sucesso!');
  }

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={{flex: 1}}>
        <ScrollView style={{flex: 1}}>
          <StatusBar hidden></StatusBar>

          <Modal
            animationType="slide"
            transparent={true}
            visible={modal}
            onRequestClose={() => {
              setModal(!modal);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <TextInput 
                  autoFocus={true}
                  onChangeText={text => setTask(text)}
                />
                <TouchableHighlight
                  style={{...styles.openButton, backgroundColor: '#2196F3'}}
                  onPress={() => addTask()}  
                >
                  <Text style={styles.textStyle}>Adicionar Tarefa</Text>
                </TouchableHighlight>            
              </View>
            </View>
          </Modal>

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
      
        <TouchableOpacity 
          style={styles.buttonAddTask}
          onPress={() => {
            setModal(true);
          }}
        >
          <Text
            style={styles.buttonText}  
          >
            Adicionar Tarefa
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({

  buttonClose: {
    flexDirection: 'row',
    alignItems: 'flex-end'
  },

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
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 5
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  buttonAddTask: {
    width: '100%',
    padding: 8,
    marginTop: 20,
    backgroundColor: 'gray'
  },

  buttonText: {
    textAlign: "center",
    color: 'white',
    fontSize: 17,
    padding: 5,
    fontWeight: 'bold'
  }

})

