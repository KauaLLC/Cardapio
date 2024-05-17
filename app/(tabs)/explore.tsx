import { StyleSheet, View, Text, Button, TextInput,  } from 'react-native';
import React, { useState, useEffect } from 'react';
import { openDatabaseSync } from 'expo-sqlite';
import { Picker } from '@react-native-picker/picker';

const db = openDatabaseSync('mydb.db');

db.execSync(`CREATE TABLE IF NOT EXISTS categoria (IdCategoria INTEGER PRIMARY KEY AUTOINCREMENT, NomeCategoria TEXT NOT NULL);`);


// db.execSync(`INSERT INTO categoria (IdCategoria, NomeCategoria) VALUES (NULL, "Proteina");`);
// db.execSync(`INSERT INTO categoria (IdCategoria, NomeCategoria) VALUES (NULL, "Carboidrato");`);
// db.execSync(`INSERT INTO categoria (IdCategoria, NomeCategoria) VALUES (NULL, "Legume");`);
// db.execSync(`DELETE FROM categoria WHERE IdCategoria;`);
// db.execSync(`DELETE FROM categoria WHERE IdCategoria = 3 ;`);
// db.execSync(`DELETE FROM categoria WHERE IdCategoria = 2 ;`);


db.execSync(`CREATE TABLE IF NOT EXISTS alimento (nome TEXT PRIMARY KEY, categoria_id INTEGER NOT NULL, FOREIGN KEY (categoria_id) REFERENCES categoria(IdCategoria));`);


export default function TabTwoScreen() {
  
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [alimentos, setAlimentos] = useState<Alimento[]>([]);
  const [nomeAlimento, setNomeAlimento] = useState<string>('');
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
  // const Proteina = "Proteina";
  

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

  useEffect(() => {
    setAlimentoProteina(selecionarAlimentoAleatorio('Proteina'));
    setAlimentoCarboidrato(selecionarAlimentoAleatorio('Carboidrato'));
    setAlimentoLegume(selecionarAlimentoAleatorio('Legume'));
  }, []);

  const gerarSelecaoAleatoria = () => {
    setAlimentoProteina(selecionarAlimentoAleatorio('Proteina'));
    setAlimentoCarboidrato(selecionarAlimentoAleatorio('Carboidrato'));
    setAlimentoLegume(selecionarAlimentoAleatorio('Legume'));
  }
  return (
    <View style={styles.container}>
      <View>
        <TextInput
          style={styles.input}
          onChangeText={setNomeAlimento}
          value={nomeAlimento}
          placeholder="Nome do Alimento"
        />
        <Picker
          selectedValue={categoriaId}
          style={{ height: 50, width: 150 }}
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
    
            <Text style={styles.text}>
              {alimento.nome} - {alimento.NomeCategoria}
            </Text>
            <Button title="Remover" onPress={() => removerAlimento(alimento.nome)} />
          </View>
        ))}  
        <Text>
          
        
          
        </Text>
        <Button title="gerar" onPress={() => mostrarAlimentoAleatorio} />
        <Button title="Gerar nova seleção" onPress={gerarSelecaoAleatoria} />
      <Text style={styles.text}>
        Proteina: {alimentoProteina ? alimentoProteina.nome : 'Nenhum alimento encontrado'}
      </Text>
      <Text style={styles.text}>
        Carboidrato: {alimentoCarboidrato ? alimentoCarboidrato.nome : 'Nenhum alimento encontrado'}
      </Text>
      <Text style={styles.text}>
        Legume: {alimentoLegume ? alimentoLegume.nome : 'Nenhum alimento encontrado'}
      </Text>
       
        
      </View>
               {/* {alimentos.map((alimento, index) => (
                <View key={index} style={styles.row}>
                  <Text style={styles.text}>
                    {alimento.nome} - {alimento.NomeCategoria}
                  </Text>
                </View>
              ))}   */}
        <View style={styles.table}>
          <View>
            <Text style={styles.titulo}>Proteinas</Text>
            <Text>
         
              
              {alimentos.filter(alimento => alimento.NomeCategoria === 'Proteina').map((alimento, index) => (
                <View key={index} style={styles.row}>
                  <Text style={{ 
                      // backgroundColor: 'blue',
                      margin:0,
                      flex: 0.3,
                      flexDirection: "column"
                    }}>
                    {alimento.nome}{"\n"} 
                    {/* - {alimento.NomeCategoria} */}
                  </Text>
                  
                  
                </View>
              ))}
            </Text>
          </View>
          <View>
            <Text style={styles.titulo}>Carboidratos</Text>
            <Text>
         
              
              {alimentos.filter(alimento => alimento.NomeCategoria === 'Carboidrato').map((alimento, index) => (
                <View key={index} style={styles.row}>
                  
                  <Text style={{
                      // backgroundColor:"red", 
                      flex: 0.3,
                      flexDirection: "column"
                    }}>
                     {alimento.nome } {"\n"}
                     
                     {/* {alimento.NomeCategoria}  */}
                     </Text>
                  
                  
                </View>
              ))}
            </Text>
          </View>
          <View>
            <Text style={styles.titulo}>  Legumes</Text>
            <View> 
              <Text>
                {alimentos.filter(alimento => alimento.NomeCategoria === 'Legume').map((alimento, index) => (
                  <View key={index} style={styles.row}>
                    <Text style={{ 
                      flex: 0.3,
                      flexDirection: "column"
                    }}>
                      {alimento.nome}
                      {/*  - {alimento.NomeCategoria} */}
                    </Text>
                  </View>
                ))}
              </Text>
            </View>
          </View>
          

         


        
    
          
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
    marginBottom: 10
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
   text:{
    // color:'white'
   },
  // column:{
  //   flexDirection:'column',
  //   flex: 1,
    
  // },
  // filter:{
    // flexDirection: 'row',
    // flex:1,},
    titulo:{

    }
    

 

})
