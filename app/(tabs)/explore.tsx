import { StyleSheet, View, Text } from 'react-native';
import React, { useState, useEffect } from 'react';
import { openDatabaseSync } from 'expo-sqlite';

const db = openDatabaseSync('mydb.db');

db.execSync(`CREATE TABLE IF NOT EXISTS categoria (IdCategoria INTEGER PRIMARY KEY AUTOINCREMENT, NomeCategoria TEXT NOT NULL);`);

db.execSync(`CREATE TABLE IF NOT EXISTS alimento (nome TEXT PRIMARY KEY, categoria_id INTEGER NOT NULL, FOREIGN KEY (categoria_id) REFERENCES categoria(IdCategoria));`);

db.execSync(`DELETE FROM categoria;`);

db.execSync(`INSERT INTO categoria (IdCategoria, NomeCategoria) VALUES (NULL, 'proteinas');`);
db.execSync(`INSERT INTO categoria (IdCategoria, NomeCategoria) VALUES (NULL, 'carboidratos');`);
db.execSync(`INSERT INTO categoria (IdCategoria, NomeCategoria) VALUES (NULL, 'legumes');`);

interface Categoria {
  IdCategoria: number;
  NomeCategoria: string;
}
export default function TabTwoScreen() {
  
  const [categorias, setCategorias] = useState<string[]>([]);

  useEffect(() => {
    const allRows = db.getAllSync('SELECT * FROM categoria');
    const categoriasArray: string[] = [];
    for (const row of allRows) {
      const categoria: Categoria = row as Categoria;
      //setCategoria(categoria.NomeCategoria);
      categoriasArray.push(categoria.NomeCategoria);
    }
    setCategorias(categoriasArray);
  }, []);
 
  return (
    <View style={styles.container}>
      {categorias.map((categoria, index) => (
        <Text key={index} style={styles.text}>
          {categoria}
        </Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text:{
    color:'white'
  }
})
