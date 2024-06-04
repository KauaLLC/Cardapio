import {
  StyleSheet,
  View,
  Text,
  Button,
  TextInput,
  Appearance,
  Animated,
  TouchableOpacity,
  Image,
  FlatList,
  Modal,
  Pressable,
  Alert,
} from "react-native";

import React, { useState, useEffect } from "react";
import { openDatabaseSync } from "expo-sqlite";
import { Picker } from "@react-native-picker/picker";
import { useNavigation, useIsFocused } from "@react-navigation/native";

const db = openDatabaseSync("mydb2.db");

db.execSync(
  `CREATE TABLE IF NOT EXISTS categoria (IdCategoria INTEGER PRIMARY KEY AUTOINCREMENT, NomeCategoria TEXT NOT NULL);`
); 
db.execSync(
  `INSERT INTO categoria (NomeCategoria)
   SELECT 'Proteínas'
   WHERE NOT EXISTS (
     SELECT 1
     FROM categoria
     WHERE NomeCategoria = 'Proteínas'
   );`
);
db.execSync(
  `INSERT INTO categoria (NomeCategoria)
   SELECT 'Carboidratos'
   WHERE NOT EXISTS (
     SELECT 1
     FROM categoria
     WHERE NomeCategoria = 'Carboidratos'
   );`
);

// db.execAsync(`DELETE FROM categoria`)
db.execSync(
  `INSERT INTO categoria (NomeCategoria)
   SELECT 'Legumes'
   WHERE NOT EXISTS (
     SELECT 1
     FROM categoria
     WHERE NomeCategoria = 'Legumes'
   );`
);


db.execSync(
  `CREATE TABLE IF NOT EXISTS alimento (nome TEXT PRIMARY KEY, categoria_id INTEGER NOT NULL, FOREIGN KEY (categoria_id) REFERENCES categoria(IdCategoria));`
);

export default function Lista() {

  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const isFocused = useIsFocused();
  const [categoriaId, setCategoriaId] = useState<number>(0);
  const [nomeAlimentoError, setNomeAlimentoError] = useState('')
  const [errorMessage, setErrorMessage] = useState(''); const [nomeAlimento, setNomeAlimento] = useState<string>("");
  const [alimentos, setAlimentos] = useState<Alimento[]>([]);
  // const [alimentosFiltrados, setAlimentosFiltrados] = useState<Alimento[]>([]);


  useEffect(() => {
    if (isFocused) {
      atualizarAlimentos();
    }
  }, [isFocused]);



  const atualizarAlimentos = () => {
    const allRows = db.getAllSync('SELECT alimento.nome, categoria.NomeCategoria, categoria.IdCategoria FROM alimento JOIN categoria ON alimento.categoria_id = categoria.IdCategoria order by alimento.categoria_id');
    const alimentosArray: Alimento[] = [];

    for (const row of allRows) {
      const alimento: Alimento = row as Alimento;
      alimentosArray.push(alimento);
    }

    setAlimentos(alimentosArray);
  };
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
  const mostrarProteinas = () => {
    const allRows = db.getAllSync('SELECT * FROM categoria WHERE IdCategoria = 1');
    const categoriasArray: Categoria[] = [];
    for (const row of allRows) {
      const categoria: Categoria = row as Categoria;
      categoriasArray.push(categoria);
    }
    setCategorias(categoriasArray);
  }


  const adicionarAlimento = () => {

    let isValid = true;
    if (!categoriaId) {
      setErrorMessage('Por favor, selecione uma categoria.');
      isValid = false;
    } else {
      setErrorMessage('');
    }

    if (!nomeAlimento) {
      setNomeAlimentoError('Por favor, insira o nome do alimento.');
      isValid = false;
    } else {
      setNomeAlimentoError('');
    }

    if (isValid) {
      const stmt = db.prepareSync(
        `INSERT INTO alimento (nome, categoria_id) VALUES (?, ?)`
      );
      stmt.executeAsync([nomeAlimento, categoriaId]);
      setNomeAlimento("");
      setCategoriaId(0);
      atualizarAlimentos();
      setModalVisible(false);
      setModalVisible(false);
    }
  };

  const removerAlimento = (nome: string) => {
    const stmt = db.prepareSync(`DELETE FROM alimento WHERE nome = ?`);
    stmt.executeAsync(nome);
    atualizarAlimentos();

  };
  interface Categoria {
    IdCategoria: number;
    NomeCategoria: string;
  }
  interface Alimento {
    nome: string;
    IdCategoria: number;
    NomeCategoria: string;
  }
  const QuantAlimen = Array(alimentos.length).length
  // console.log(QuantAlimen);

  const filteredAliments = categoriaId != 0 ? alimentos.filter(alimento => alimento.IdCategoria == categoriaId) : alimentos;

  return (
    <View style={styles.container}>
      <View style={styles.headerTopBar}>
        <Text style={styles.headerTopBarText}>Listagem de alimentos</Text>
      </View>
      <View style={[styles.pickerFiltro]}>
        <Picker
          selectedValue={categoriaId}
          onValueChange={(itemValue) =>
            setCategoriaId(itemValue)
          }
        >
          <Picker.Item
            // style={{ color: "#297B4E" }}
            label="Todas as categorias"
            value="0"

          />

          {categorias.map((categoria, index) => (
            <Picker.Item
              key={index}
              label={`${categoria.NomeCategoria}`}
              value={categoria.IdCategoria}
            />

          ))}
        </Picker>
      </View>
      <View style={styles.header}>
        <Text style={styles.heading}>Alimentos:</Text>
        <Text style={[styles.heading, styles.marginHeaderCatego]}>Categorias:</Text>
        <Text style={[styles.heading, styles.marginHeaderCatego]}></Text>
        </View>
      <FlatList

        data={filteredAliments}
        keyExtractor={(item) => item.nome}
        renderItem={({ item }) => (
          <View
            style={styles.row}
          >
            <Text style={styles.cell}>{item.nome}</Text>
            <Text style={styles.cell}>{item.NomeCategoria}</Text>
            <Text>

              <Button
                color="#297B4E"
                title="Remover"
                onPress={() => removerAlimento(item.nome)}
              />
            </Text>

          </View>
        )}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>

            <Text style={styles.modalText}>Adicionar Alimento</Text>

            <View style={styles.container2}>
              <TextInput
                style={[styles.input]}
                onChangeText={setNomeAlimento}
                value={nomeAlimento}
                placeholder="Nome do alimento"
              />
              {nomeAlimentoError ? (
                <Text style={styles.errorText}>{nomeAlimentoError}</Text>
              ) : null}
              <View style={[styles.pickerSelecionar]}>
                <Picker
                  selectedValue={categoriaId}
                  onValueChange={(itemValue, itemIndex) =>
                    setCategoriaId(itemValue)
                  }
                >
                  <Picker.Item
                    style={{ color: "#297B4E" }}
                    label="Selecione a categoria do alimento:"
                    value=""
                  />


                  {categorias.map((categoria, index) => (
                    <Picker.Item
                      key={index}
                      label={`${categoria.NomeCategoria}`}
                      value={categoria.IdCategoria}
                    />

                  ))}
                </Picker>
              </View>
              {errorMessage ? (
                <Text style={styles.errorText}>{errorMessage}</Text>
              ) : null}
              <View style={styles.buttonSelecao}>
                <Pressable
                  style={[styles.buttonCancelar]}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text style={styles.textGreen}>Cancelar</Text>
                </Pressable>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={adicionarAlimento}
                >
                  <Text style={styles.TextWhite}>Adicionar</Text>
                </Pressable>
              </View>
            </View>

          </View>
        </View>
      </Modal>

      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.textStyle}>Adicionar alimento</Text>
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 15,
    paddingHorizontal: 30,
    backgroundColor: "#f7f7f8"
  },
  errorText: {
    marginBottom: 5,
    color: '#DB0000'
  },
  container2: {
    marginTop: 20,
    flexDirection: "column",
    // justifyContent: "space-evenly",
    alignItems: "center",
  },
  input: {
    height: 50,
    width: 200,
    borderColor: "gray",
    backgroundColor: '#E9ECEF',
    borderWidth: 1,
    marginBottom: 10,
    textAlign: "center",
  },
  headerTopBar: {
    paddingVertical: 10,
    padding: 12,
    borderRadius: 5,
    marginBottom: 15,
  },
  headerTopBarText: {
    fontWeight: "bold",
    fontSize: 20,
    color: '#09371D',
    marginBottom: 0,
    textAlign:"center"
    
  },
  header: {
    flexDirection: "row",
  },
  marginHeaderCatego: {
    marginLeft: 13,
  },
  heading: {
    flex: 1,
    paddingLeft: 2,
    fontSize: 15,
    fontWeight: "bold",
  },
  botaoRemove: {
    borderRadius: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 8,
    marginHorizontal: 2,
    elevation: 1,
    borderColor: "#fff",
    borderRadius: 3,
    padding: 10,
    backgroundColor: "#fff",
  },
  cell: {
    fontSize: 15,
    textAlign: "left",
    flex: 1,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
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
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 15,
    padding: 10,
    elevation: 2,
    backgroundColor: '#297B4E',
    marginHorizontal: 6,
  },
  buttonCancelar: {
    borderRadius: 16,
    padding: 10,
    elevation: 2,
    backgroundColor: '#E9ECEF',
    color: '#297B4E',
    marginHorizontal: 6,
  },
  TextWhite: {
    color: 'white'
  },
  textGreen: {
    color: '#297B4E',
  },
  buttonOpen: {
    backgroundColor: "#297B4E",
  },
  buttonClose: {
    backgroundColor: "#297B4E",
  },
  buttonSelecao: {
    flexDirection: 'row',
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontWeight: "bold",

  },
  text: {
    fontSize: 15,
  },


  pickerSelecionar: {
    height: 40,
    width: 200,
    backgroundColor: '#E9ECEF',
    margin: 0,
    borderColor: "gray", 
    paddingBottom: 49, 
    borderWidth: 1, 
    marginBottom:  10,
  },
  pickerFiltro:{
    backgroundColor: '#E9ECEF',
    marginLeft:0,
    // borderColor: "gray", 
    // borderWidth: 1, 
    marginBottom:  10,
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 4,
    // elevation: 5,


  }
});
