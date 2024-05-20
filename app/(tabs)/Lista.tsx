import { StyleSheet, View, Text, Button, TextInput, Appearance, useColorScheme, Animated, TouchableOpacity,Image,FlatList,Modal,Pressable,Alert } from 'react-native';

import React, { useState, useEffect } from 'react';
import { openDatabaseSync } from 'expo-sqlite';
import { Picker } from '@react-native-picker/picker'; 
// import { processFontFamily } from 'expo-font';
import { useNavigation, useIsFocused } from '@react-navigation/native';


const db = openDatabaseSync('mydb.db');

db.execSync(`CREATE TABLE IF NOT EXISTS categoria (IdCategoria INTEGER PRIMARY KEY AUTOINCREMENT, NomeCategoria TEXT NOT NULL);`);
// db.execSync(`INSERT INTO categoria (IdCategoria, NomeCategoria) VALUES (NULL, "Proteina");`);
// db.execSync(`INSERT INTO categoria (IdCategoria, NomeCategoria) VALUES (NULL, "Carboidrato");`);
// db.execSync(`INSERT INTO categoria (IdCategoria, NomeCategoria) VALUES (NULL, "Legume");`);
// db.execSync(`DELETE FROM categoria WHERE IdCategoria = 4 ;`);
// db.execSync(`DELETE FROM categoria WHERE IdCategoria = 5 ;`);
// db.execSync(`DELETE FROM categoria WHERE IdCategoria = 6 ;`);
db.execSync(`CREATE TABLE IF NOT EXISTS alimento (nome TEXT PRIMARY KEY, categoria_id INTEGER NOT NULL, FOREIGN KEY (categoria_id) REFERENCES categoria(IdCategoria));`);



export default function index() {

  const colorScheme = useColorScheme();

  const themeTextStyle = colorScheme === 'light' ? styles.lightThemeText : styles.darkThemeText;
  const themeContainerStyle = colorScheme === 'light' ? styles.lightContainer : styles.darkContainer;
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  
  
const [modalVisible, setModalVisible] = useState(false);
const isFocused = useIsFocused();


const [categoriaId, setCategoriaId] = useState<number>(0);

  useEffect(() => {
    if (isFocused) {
      // atualizarCategorias();
      atualizarAlimentos();
    }
  }, [isFocused]);

  const [alimentos, setAlimentos] = useState<Alimento[]>([]);
  const [nomeAlimento, setNomeAlimento] = useState<string>('');
  

  const atualizarAlimentos = () => {
    const allRows = db.getAllSync('SELECT alimento.nome, categoria.NomeCategoria FROM alimento JOIN categoria ON alimento.categoria_id = categoria.IdCategoria');
    const alimentosArray: Alimento[] = [];

    for (const row of allRows) {
      const alimento: Alimento = row as Alimento;
      alimentosArray.push(alimento);
      
    }
    // console.log("atualizou")
    setAlimentos(alimentosArray);
  }
  const adicionarAlimento = () => {
    const stmt = db.prepareSync(`INSERT INTO alimento (nome, categoria_id) VALUES (?, ?)`);
    stmt.executeAsync([nomeAlimento, categoriaId]);
    setNomeAlimento('');
    setCategoriaId(0);
    atualizarAlimentos();
    // console.log("adicionou")
  }


 const removerAlimento = (nome: string) => {
    const stmt = db.prepareSync(`DELETE FROM alimento WHERE nome = ?`);
    stmt.executeAsync(nome);
    atualizarAlimentos();
  }
  interface Categoria {
    IdCategoria: number;
    NomeCategoria: string;
  }
  interface Alimento {
    nome: string;
    categoria_id: number;
    NomeCategoria: string;
  }
 
return(
    
    <View style={styles.container}>
        <View style={styles.headerTopBar}>
            <Text style={styles.headerTopBarText}>Alimentos</Text>
        </View>
        <View style={styles.header}>
            <Text style={styles.heading}>Categoria</Text>
            <Text style={styles.heading}>Alimento</Text>
            <Text style={styles.heading}>move</Text>
        </View>
        <FlatList
              data={alimentos}
              keyExtractor={(item) => item.nome}
              renderItem={({ item }) => (
                <View style={styles.row}
                // style={styles.item}
                >
                  <Text style={styles.cell}>{item.nome}</Text>
                  <Text style={styles.cell}>{item.NomeCategoria}</Text>
                  <Text>
                  <Button color="#6ab7e2" title="Remover" onPress={() => removerAlimento(item.nome)} />
                  </Text>
                </View>
              )}

        />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Adicionar Alimento</Text>
            {/* <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>  
            </Pressable> */}
            <View style={styles.container2}>
                <TextInput
                  style={[styles.input , themeTextStyle]}
                  onChangeText={setNomeAlimento}
                  value={nomeAlimento}
                  placeholder="Nome do Alimento"
                />
                <Picker
          selectedValue={categoriaId}
          style={ [styles.picker, themeTextStyle]}
          onValueChange={(itemValue, itemIndex) => setCategoriaId(itemValue)}
        >
           <Picker.Item style={{color:'#d2d2d2'}} label='selecione categoria' value="" enabled={false} />
          {categorias.map((categoria, index) => (
           
            <Picker.Item key={index} label={`${categoria.NomeCategoria}`} value={categoria.IdCategoria} />
          ))}
        </Picker>
                </View>
          </View>
        </View>
      </Modal>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}>
        <Text style={styles.textStyle}>Show Modal</Text>
      </Pressable>
    </View>


)}
const styles = StyleSheet.create({
    container: {
      flex:1,
      paddingVertical:30,
      paddingHorizontal:30,

    },
    container2: {
      marginTop:60, 
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    input: {
      height: 40,
      width: 200,
      borderColor: 'gray',
      borderWidth: 1,
      marginBottom: 10,
      textAlign:"center"
     
    },
    headerTopBar:{
        backgroundColor:"#6ab7e2",
        paddingVertical:10,
        padding:12,
        borderRadius:5,
        elevation:2,
        marginBottom:15
        },
    headerTopBarText:{
        color:"#fff",
        fontSize:16,
        
    },
    header:{
        flexDirection:"row",
        // justifyContent:"space-between",
        padding:6,
        // backgroundColor:"blue",
        
    },  
    heading:{
        flex:1,
        fontSize:15,
        

    },
    row:{
        flexDirection:"row",
        justifyContent:"space-between",
        marginVertical:8,
        marginHorizontal:2,
        elevation:1,
        borderColor:"#fff",
        borderRadius:3,
        padding:10,
        backgroundColor:"#fff"
    },
    cell:{
        fontSize:15,
        textAlign:'left',
        flex:1,

    },
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
    },
    modalView: {
      margin: 20,
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 35,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2,
    },
    buttonOpen: {
      backgroundColor: '#6ab7e2',
    },
    buttonClose: {
      backgroundColor: '#2196F3',
    },
    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
    },
    text: {
      fontSize: 15,
    },
    lightContainer: {
      // backgroundColor: '#fff',
    },
    darkContainer: {
      backgroundColor: '#000',
    },
    lightThemeText: {
      color: 'black',
    },
    darkThemeText: {
      color: '#fff',
    },picker:{ height: 50, width: 150 , }
  });
