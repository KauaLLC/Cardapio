import { StyleSheet, View, Text, Button, TextInput, } from 'react-native';
import React, { useState, useEffect } from 'react';
import { openDatabaseSync } from 'expo-sqlite';
import { Picker } from '@react-native-picker/picker'; 
import { Appearance, useColorScheme } from 'react-native';
// import CrudCategoria from '@/app/CrudAlimento'

const db = openDatabaseSync('mydb.db');

db.execSync(`CREATE TABLE IF NOT EXISTS categoria (IdCategoria INTEGER PRIMARY KEY AUTOINCREMENT, NomeCategoria TEXT NOT NULL);`);


// db.execSync(`INSERT INTO categoria (IdCategoria, NomeCategoria) VALUES (NULL, "Proteina");`);
// db.execSync(`INSERT INTO categoria (IdCategoria, NomeCategoria) VALUES (NULL, "Carboidrato");`);
// db.execSync(`INSERT INTO categoria (IdCategoria, NomeCategoria) VALUES (NULL, "Legume");`);
// db.execSync(`DELETE FROM categoria WHERE IdCategoria = 4 ;`);
// db.execSync(`DELETE FROM categoria WHERE IdCategoria = 5 ;`);
// db.execSync(`DELETE FROM categoria WHERE IdCategoria = 6 ;`);


db.execSync(`CREATE TABLE IF NOT EXISTS alimento (nome TEXT PRIMARY KEY, categoria_id INTEGER NOT NULL, FOREIGN KEY (categoria_id) REFERENCES categoria(IdCategoria));`);


export default function TabTwoScreen() {
  const colorScheme = useColorScheme();

  const themeTextStyle = colorScheme === 'light' ? styles.lightThemeText : styles.darkThemeText;
  const themeContainerStyle = colorScheme === 'light' ? styles.lightContainer : styles.darkContainer;
  

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
  }  interface Alimento {
    nome: string;
    categoria_id: number;
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


  return (
    <View style={[styles.container, themeContainerStyle]}>
      <View>
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
        <Button title="Adicionar Alimento" onPress={adicionarAlimento} />
        {alimentos.map((alimento, index) => (
          <View key={index} style={styles.row}>
    
            <Text style={[styles.text, themeTextStyle]}>
              {alimento.nome} - {alimento.NomeCategoria}
            </Text>
            <Button title="Remover" onPress={() => removerAlimento(alimento.nome)} />
          </View>
        ))}  
  
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    marginTop:60,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    
    
  }, 
  input: {
    height: 40,
    width: 200,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
   
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    

  },
  table:{
    backgroundColor:"#d1d1",
    width:"90%",
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop:10,
    padding:0,
   },

  textContainer: {
    flex: 1, // Ocupa espaço disponível
    justifyContent: 'center', // Centraliza verticalmente
  },
  buttonContainer: {
    flexDirection: 'row', // Alinha os botões horizontalmente
    justifyContent: 'space-evenly', // Espaço entre os botões
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
    

 

})
