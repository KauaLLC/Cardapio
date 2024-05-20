import { StyleSheet, View, Text, Button, TextInput, Appearance, useColorScheme, Animated, TouchableOpacity,Image,FlatList } from 'react-native';

import React, { useState, useEffect } from 'react';
import { openDatabaseSync } from 'expo-sqlite';
import { Picker } from '@react-native-picker/picker'; 
import { processFontFamily } from 'expo-font';


const db = openDatabaseSync('mydb.db');

db.execSync(`CREATE TABLE IF NOT EXISTS categoria (IdCategoria INTEGER PRIMARY KEY AUTOINCREMENT, NomeCategoria TEXT NOT NULL);`);

db.execSync(`CREATE TABLE IF NOT EXISTS alimento (nome TEXT PRIMARY KEY, categoria_id INTEGER NOT NULL, FOREIGN KEY (categoria_id) REFERENCES categoria(IdCategoria));`);



export default function index() {


const [categorias, setCategorias] = useState<Categoria[]>([]);
const [categoriaId, setCategoriaId] = useState<number>(0);

  useEffect(() => {
    atualizarCategorias();
    atualizarAlimentos();
  }, []);
  const atualizarCategorias = () => {
    const allRows = db.getAllSync('SELECT * FROM categoria');
    const categoriasArray: Categoria[] = [];
    for (const row of allRows) {
      const categoria: Categoria = row as Categoria;
      categoriasArray.push(categoria);
    }
    setCategorias(categoriasArray);
  }
 interface Categoria {
    IdCategoria: number;
    NomeCategoria: string;
  }
  
  
  const [alimentos, setAlimentos] = useState<Alimento[]>([]);
  const [nomeAlimento, setNomeAlimento] = useState<string>('');
  

  const atualizarAlimentos = () => {
    const allRows = db.getAllSync('SELECT alimento.nome, categoria.NomeCategoria FROM alimento JOIN categoria ON alimento.categoria_id = categoria.IdCategoria');
    const alimentosArray: Alimento[] = [];
    for (const row of allRows) {
      const alimento: Alimento = row as Alimento;
      alimentosArray.push(alimento);
      
    }
    
    setAlimentos(alimentosArray);
  }


 const removerAlimento = (nome: string) => {
    const stmt = db.prepareSync(`DELETE FROM alimento WHERE nome = ?`);
    stmt.executeAsync(nome);
    atualizarAlimentos();
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
            <Text style={styles.heading}></Text>
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
    </View>


)}
const styles = StyleSheet.create({
    container: {
      flex:1,
      paddingVertical:30,
      paddingHorizontal:30,

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

    }
  });
