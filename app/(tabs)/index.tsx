import { StyleSheet, View, Text, Button, TextInput, Appearance, useColorScheme } from 'react-native';
import React, { useState, useEffect } from 'react';
import { openDatabaseSync } from 'expo-sqlite';
import { Picker } from '@react-native-picker/picker'; 

// import CrudCategoria from '@/app/CrudAlimento'

const db = openDatabaseSync('mydb.db');

db.execSync(`CREATE TABLE IF NOT EXISTS categoria (IdCategoria INTEGER PRIMARY KEY AUTOINCREMENT, NomeCategoria TEXT NOT NULL);`);


// db.execSync(`INSERT INTO categoria (IdCategoria, NomeCategoria) VALUES (NULL, "Proteina");`);
// db.execSync(`INSERT INTO categoria (IdCategoria, NomeCategoria) VALUES (NULL, "Carboidrato");`);
// db.execSync(`INSERT INTO categoria (IdCategoria, NomeCategoria) VALUES (NULL, "Legume");`);
// db.execSync(`DELETE FROM categoria WHERE IdCategoria;`);
// db.execSync(`DELETE FROM categoria WHERE IdCategoria = 3 ;`);
// db.execSync(`DELETE FROM categoria WHERE IdCategoria = 2 ;`);


db.execSync(`CREATE TABLE IF NOT EXISTS alimento (nome TEXT PRIMARY KEY, categoria_id INTEGER NOT NULL, FOREIGN KEY (categoria_id) REFERENCES categoria(IdCategoria));`);


export default function index() {
  useEffect(() => {
    atualizarCategorias();
    atualizarAlimentos();
  }, []);
  const colorScheme = useColorScheme();

  const themeTextStyle = colorScheme === 'light' ? styles.lightThemeText : styles.darkThemeText;
  const themeContainerStyle = colorScheme === 'light' ? styles.lightContainer : styles.darkContainer;



  

// categoria

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
// alimento
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


 

  interface Alimento {
    nome: string;
    categoria_id: number;
    NomeCategoria: string;
  }

 
  const selecionarAlimentoAleatorio = (categoria: string) => {
    const allRows = db.getAllSync(`SELECT * FROM alimento JOIN categoria ON alimento.categoria_id = categoria.IdCategoria WHERE categoria.NomeCategoria = ?`, categoria);
    if (allRows.length > 0) {
      const indexAleatorio = Math.floor(Math.random() * allRows.length);
      const alimento: Alimento = allRows[indexAleatorio] as Alimento;
    return alimento;
  }
  return null;
}


  

  
  const mostrarAlimentoAleatorio = () => {
    const proteina = selecionarAlimentoAleatorio('Proteina');
    const carboidrato = selecionarAlimentoAleatorio('Carboidrato');
    const legume = selecionarAlimentoAleatorio('Legume');

  }
  
  const [alimentoProteina, setAlimentoProteina] = useState<Alimento | null>(null);
  const [alimentoCarboidrato, setAlimentoCarboidrato] = useState<Alimento | null>(null);
  const [alimentoLegume, setAlimentoLegume] = useState<Alimento | null>(null);
  const [alimentoProteina1, setAlimentoProteina1] = useState<Alimento | null>(null);
  const [alimentoCarboidrato1, setAlimentoCarboidrato1] = useState<Alimento | null>(null);
  const [alimentoLegume1, setAlimentoLegume1] = useState<Alimento | null>(null);
  const [alimentoProteina2, setAlimentoProteina2] = useState<Alimento | null>(null);
  const [alimentoCarboidrato2, setAlimentoCarboidrato2] = useState<Alimento | null>(null);
  const [alimentoLegume2, setAlimentoLegume2] = useState<Alimento | null>(null);


  useEffect(() => {
    setAlimentoProteina(selecionarAlimentoAleatorio('Proteina'));
    setAlimentoCarboidrato(selecionarAlimentoAleatorio('Carboidrato'));
    setAlimentoLegume(selecionarAlimentoAleatorio('Legume'));

    setAlimentoProteina1(selecionarAlimentoAleatorio('Proteina'));
    setAlimentoCarboidrato1(selecionarAlimentoAleatorio('Carboidrato'));
    setAlimentoLegume1(selecionarAlimentoAleatorio('Legume'));

    setAlimentoProteina2(selecionarAlimentoAleatorio('Proteina'));
    setAlimentoCarboidrato2(selecionarAlimentoAleatorio('Carboidrato'));
    setAlimentoLegume2(selecionarAlimentoAleatorio('Legume'));
  }, []);


  const gerarSelecaoAleatoria = () => {
    setAlimentoProteina(selecionarAlimentoAleatorio('Proteina'));
    setAlimentoCarboidrato(selecionarAlimentoAleatorio('Carboidrato'));
    setAlimentoLegume(selecionarAlimentoAleatorio('Legume'));

    setAlimentoProteina1(selecionarAlimentoAleatorio('Proteina'));
    setAlimentoCarboidrato1(selecionarAlimentoAleatorio('Carboidrato'));
    setAlimentoLegume1(selecionarAlimentoAleatorio('Legume'));

    setAlimentoProteina2(selecionarAlimentoAleatorio('Proteina'));
    setAlimentoCarboidrato2(selecionarAlimentoAleatorio('Carboidrato'));
    setAlimentoLegume2(selecionarAlimentoAleatorio('Legume'));
  }
  return (
    <View style={[styles.container, themeContainerStyle]}>
      
        <View style={{justifyContent:"center",width:"90%", margin:30, alignItems:"center",}}>
          <Text style={[styles.text, themeTextStyle]}>
            {/* Color scheme: {colorScheme} */}
            CARDAPIO 
            </Text>
        </View>
     
      <View style={styles.textContainer}>
        <Text style={[styles.text, themeTextStyle]}>
          Proteína: {alimentoProteina ? alimentoProteina.nome : 'Nenhum alimento encontrado'}
        </Text >
        <Text style={[styles.text, themeTextStyle]}>
          Carboidrato: {alimentoCarboidrato ? alimentoCarboidrato.nome : 'Nenhum alimento encontrado'}
        </Text>
        <Text style={[styles.text, themeTextStyle]}>
          Legume: {alimentoLegume ? alimentoLegume.nome : 'Nenhum alimento encontrado'}
        </Text >
        
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Gerar nova seleção" onPress={gerarSelecaoAleatoria} />
        <Button title="Gerar" onPress={mostrarAlimentoAleatorio} />
      </View>
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    margin: 30,
    flex: 1,
    justifyContent: 'center', // Centraliza verticalmente
    alignItems:"center"
  },
  textContainer: {
    flex: 1, // Ocupa espaço disponível
    justifyContent: 'center', // Centraliza verticalmente
  },
  buttonContainer: {
    flexDirection: 'row', // Alinha os botões horizontalmente
    justifyContent: 'space-evenly',
    width:"100%"
    // Espaço entre os botões
  },
  text: {
    fontSize: 15,
  },
  lightContainer: {
    // backgroundColor: '#fff',
  },
  darkContainer: {
    backgroundColor: '#020202',

  },
  lightThemeText: {
    color: '#0202020',
  },
  darkThemeText: {
    color: '#fff',
  },
});
