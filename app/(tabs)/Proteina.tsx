// import { StyleSheet, View, Text, Button, TextInput, } from 'react-native';
// import React, { useState, useEffect } from 'react';
// import { openDatabaseSync } from 'expo-sqlite';
// // import { Picker } from '@react-native-picker/picker';

// const db = openDatabaseSync('mydb.db');

// db.execSync(`CREATE TABLE IF NOT EXISTS categoria (IdCategoria INTEGER PRIMARY KEY AUTOINCREMENT, NomeCategoria TEXT NOT NULL);`);

// db.execSync(`CREATE TABLE IF NOT EXISTS proteina (nome TEXT PRIMARY KEY, categoria_id INTEGER NOT NULL, FOREIGN KEY (categoria_id) REFERENCES categoria(IdCategoria));`);

// interface Categoria {
//   IdCategoria: number;
//   NomeCategoria: string;
// }

// interface Proteina {
//   nome: string;
//   categoria_id: number;
// }

// export default function TabTwoScreen() {
  
//   const [categorias, setCategorias] = useState<Categoria[]>([]);
//   const [proteinas, setProteinas] = useState<Proteina[]>([]);
//   const [nomeProteina, setNomeProteina] = useState<string>('');
//   const [categoriaId, setCategoriaId] = useState<number>(0);

//   useEffect(() => {
//     atualizarCategorias();
//     atualizarProteinas();
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

//   const atualizarProteinas = () => {
//     const allRows = db.getAllSync('SELECT * FROM proteina');
//     const proteinasArray: Proteina[] = [];
//     for (const row of allRows) {
//       const proteina: Proteina = row as Proteina;
//       proteinasArray.push(proteina);
//     }
//     setProteinas(proteinasArray);
//   }

//   const adicionarProteina = () => {
//     const stmt = db.prepareSync(`INSERT INTO proteina (nome, categoria_id) VALUES (?, ?)`);
//     stmt.executeAsync([nomeProteina, categoriaId]);
//     setNomeProteina('');
//     setCategoriaId(0);
//     atualizarProteinas();
//   }

//   const removerProteina = (nome: string) => {
//     const stmt = db.prepareSync(`DELETE FROM proteina WHERE nome = ?`);
//     stmt.executeAsync(nome);
//     atualizarProteinas();
//   }

//   return (
//     <View style={styles.container}>
//       <View>
//         <TextInput
//           style={styles.input}
//           onChangeText={setNomeProteina}
//           value={nomeProteina}
//           placeholder="Nome da Proteína"
//         />
//         {/* <Picker
//           selectedValue={categoriaId}
//           style={{ height: 50, width: 150 }}
//           onValueChange={(itemValue: any, itemIndex: any) => setCategoriaId(itemValue)}
//         >
//           {categorias.map((categoria, index) => (
//             <Picker.Item key={index} label={categoria.NomeCategoria} value={categoria.IdCategoria} />
//           ))}
//         </Picker> */}
//         <Button title="Adicionar Proteína" onPress={adicionarProteina} />
//         {proteinas.map((proteina, index) => (
//           <View key={index} style={styles.row}>
//             <Text style={styles.text}>
//               {proteina.nome}
//             </Text>
//             <Button title="Remover" onPress={() => removerProteina(proteina.nome)} />
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
