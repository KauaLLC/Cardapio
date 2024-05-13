// import { StyleSheet, View, Text, Button, TextInput, } from 'react-native';
// import React, { useState, useEffect } from 'react';
// import { openDatabaseSync } from 'expo-sqlite';
// import { Picker } from '@react-native-picker/picker';

// const db = openDatabaseSync('mydb.db');

// db.execSync(`CREATE TABLE IF NOT EXISTS categoria (IdCategoria INTEGER PRIMARY KEY AUTOINCREMENT, NomeCategoria TEXT NOT NULL);`);

// db.execSync(`CREATE TABLE IF NOT EXISTS carboidrato (nome TEXT PRIMARY KEY, categoria_id INTEGER NOT NULL, FOREIGN KEY (categoria_id) REFERENCES categoria(IdCategoria));`);

// interface Categoria {
//   IdCategoria: number;
//   NomeCategoria: string;
// }

// interface Carboidrato {
//   nome: string;
//   categoria_id: number;
// }

// export default function TabTwoScreen() {
  
//   const [categorias, setCategorias] = useState<Categoria[]>([]);
//   const [carboidratos, setCarboidratos] = useState<Carboidrato[]>([]);
//   const [nomeCarboidrato, setNomeCarboidrato] = useState<string>('');
//   const [categoriaId, setCategoriaId] = useState<number>(0);

//   useEffect(() => {
//     atualizarCategorias();
//     atualizarCarboidratos();
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

//   const atualizarCarboidratos = () => {
//     const allRows = db.getAllSync('SELECT * FROM carboidrato');
//     const carboidratosArray: Carboidrato[] = [];
//     for (const row of allRows) {
//       const carboidrato: Carboidrato = row as Carboidrato;
//       carboidratosArray.push(carboidrato);
//     }
//     setCarboidratos(carboidratosArray);
//   }

//   const adicionarCarboidrato = () => {
//     const stmt = db.prepareSync(`INSERT INTO carboidrato (nome, categoria_id) VALUES (?, ?)`);
//     stmt.executeAsync([nomeCarboidrato, categoriaId]);
//     setNomeCarboidrato('');
//     setCategoriaId(0);
//     atualizarCarboidratos();
//   }

//   const removerCarboidrato = (nome: string) => {
//     const stmt = db.prepareSync(`DELETE FROM carboidrato WHERE nome = ?`);
//     stmt.executeAsync(nome);
//     atualizarCarboidratos();
//   }

//   return (
//     <View style={styles.container}>
//       <View>
//         <TextInput
//           style={styles.input}
//           onChangeText={setNomeCarboidrato}
//           value={nomeCarboidrato}
//           placeholder="Nome do Carboidrato"
//         />
        
//         <Button title="Adicionar Carboidrato" onPress={adicionarCarboidrato} />
//         {carboidratos.map((carboidrato, index) => (
//           <View key={index} style={styles.row}>
//             <Text style={styles.text}>
//               {carboidrato.nome}
//             </Text>
//             <Button title="Remover" onPress={() => removerCarboidrato(carboidrato.nome)} />
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
