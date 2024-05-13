// import React from 'react';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { NavigationContainer } from '@react-navigation/native';
// // import HomeScreen from './Proteina'; 
// // import ExploreScreen from './legume.';
// // import SettingsScreen from './carboidrato'; 

// const Tab = createBottomTabNavigator();

// export default function App() {
//   return (
//     <NavigationContainer>
//       <Tab.Navigator>
//         <Tab.Screen name="Home" component={HomeScreen} />
//         <Tab.Screen name="Explore" component={ExploreScreen} />
//         <Tab.Screen name="Settings" component={SettingsScreen} />
//       </Tab.Navigator>
//     </NavigationContainer>
//   );
// }







// import { StyleSheet, View, Text, Button, TextInput, } from 'react-native';
// import React, { useState, useEffect } from 'react';
// import { openDatabaseSync } from 'expo-sqlite';
// import { Picker } from '@react-native-picker/picker';

// const db = openDatabaseSync('mydb.db');

// db.execSync(`CREATE TABLE IF NOT EXISTS categoria (IdCategoria INTEGER PRIMARY KEY AUTOINCREMENT, NomeCategoria TEXT NOT NULL);`);

// db.execSync(`CREATE TABLE IF NOT EXISTS alimento (nome TEXT PRIMARY KEY, categoria_id INTEGER NOT NULL, FOREIGN KEY (categoria_id) REFERENCES categoria(IdCategoria));`);

// interface Categoria {
//   IdCategoria: number;
//   NomeCategoria: string;
// }

// interface Alimento {
//   nome: string;
//   categoria_id: number;
// }

// export default function TabTwoScreen() {
  
//   const [categorias, setCategorias] = useState<Categoria[]>([]);
//   const [alimentos, setAlimentos] = useState<Alimento[]>([]);
//   const [nomeAlimento, setNomeAlimento] = useState<string>('');
//   const [categoriaId, setCategoriaId] = useState<number>(0);

//   useEffect(() => {
//     atualizarCategorias();
//     atualizarAlimentos();
//   }, []);

//   const atualizarCategorias = () => {
//     const allRows = db.getAllSync('SELECT * FROM categoria');
//     const categoriasArray: Categoria[] = [];
//     for (const row of allRows) {
//       const categoria: Categoria = row as Categoria;
//       categoriasArray.push(categoria);
//     }
//     setCategorias(categoriasArray);
//   }

//   const atualizarAlimentos = () => {
//     const allRows = db.getAllSync('SELECT * FROM alimento');
//     const alimentosArray: Alimento[] = [];
//     for (const row of allRows) {
//       const alimento: Alimento = row as Alimento;
//       alimentosArray.push(alimento);
//     }
//     setAlimentos(alimentosArray);
//   }

//   const adicionarAlimento = () => {
//     const stmt = db.prepareSync(`INSERT INTO alimento (nome, categoria_id) VALUES (?, ?)`);
//     stmt.executeAsync([nomeAlimento, categoriaId]);
//     setNomeAlimento('');
//     setCategoriaId(0);
//     atualizarAlimentos();
//   }

//   const removerAlimento = (nome: string) => {
//     const stmt = db.prepareSync(`DELETE FROM alimento WHERE nome = ?`);
//     stmt.executeAsync(nome);
//     atualizarAlimentos();
//   }

//   return (
//     <View style={styles.container}>
//       <View>
//         <TextInput
//           style={styles.input}
//           onChangeText={setNomeAlimento}
//           value={nomeAlimento}
//           placeholder="Nome do Alimento"
//         />
//         <Picker
//           selectedValue={categoriaId}
//           style={{ height: 50, width: 150 }}
//           onValueChange={(itemValue: any, itemIndex: any) => setCategoriaId(itemValue)}
//         >
//           {categorias.map((categoria, index) => (
//             <Picker.Item key={index} label={categoria.NomeCategoria} value={categoria.IdCategoria} />
//           ))}
//         </Picker>
//         <Button title="Adicionar Alimento" onPress={adicionarAlimento} />
//         {alimentos.map((alimento, index) => (
//           <View key={index} style={styles.row}>
//             <Text style={styles.text}>
//               {alimento.nome}
//             </Text>
//             <Button title="Remover" onPress={() => removerAlimento(alimento.nome)} />
//           </View>
//         ))}
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
    
//   },
//   input: {
//     height: 40,
//     width: 200,
//     borderColor: 'gray',
//     borderWidth: 1,
//     marginBottom: 10
//   },
//   row: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 10
//   },
//   text:{
//     // color:'white'
//   }
// })
