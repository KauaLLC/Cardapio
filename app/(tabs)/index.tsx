import {
  StyleSheet,
  View,
  Text,
  Button,
  TextInput,
  Pressable,
  SafeAreaView,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { openDatabaseSync } from "expo-sqlite";

const db = openDatabaseSync("mydb.db");

db.execSync(
  `CREATE TABLE IF NOT EXISTS categoria (IdCategoria INTEGER PRIMARY KEY AUTOINCREMENT, NomeCategoria TEXT NOT NULL);`
);



db.execSync(
  `CREATE TABLE IF NOT EXISTS alimento (nome TEXT PRIMARY KEY, categoria_id INTEGER NOT NULL, FOREIGN KEY (categoria_id) REFERENCES categoria(IdCategoria));`
);

export default function index() {
  useEffect(() => {
    atualizarCategorias();
    atualizarAlimentos();
  }, []);


  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [categoriaId, setCategoriaId] = useState<number>(0);

  useEffect(() => {
    atualizarCategorias();
    atualizarAlimentos();
  }, []);
  const atualizarCategorias = () => {
    const allRows = db.getAllSync("SELECT * FROM categoria");
    const categoriasArray: Categoria[] = [];
    for (const row of allRows) {
      const categoria: Categoria = row as Categoria;
      categoriasArray.push(categoria);
    }
    setCategorias(categoriasArray);
  };
  interface Categoria {
    IdCategoria: number;
    NomeCategoria: string;
  }
  // alimento
  const [alimentos, setAlimentos] = useState<Alimento[]>([]);
  const [nomeAlimento, setNomeAlimento] = useState<string>("");

  const atualizarAlimentos = () => {
    const allRows = db.getAllSync(
      "SELECT alimento.nome, categoria.NomeCategoria FROM alimento JOIN categoria ON alimento.categoria_id = categoria.IdCategoria"
    );
    const alimentosArray: Alimento[] = [];
    for (const row of allRows) {
      const alimento: Alimento = row as Alimento;
      alimentosArray.push(alimento);
    }
    // console.log("atualizou")
    setAlimentos(alimentosArray);
  };

  const adicionarAlimento = () => {
    const stmt = db.prepareSync(
      `INSERT INTO alimento (nome, categoria_id) VALUES (?, ?)`
    );
    stmt.executeAsync([nomeAlimento, categoriaId]);
    setNomeAlimento("");
    setCategoriaId(0);
    atualizarAlimentos();
    // console.log("adicionou")
  };

  const removerAlimento = (nome: string) => {
    const stmt = db.prepareSync(`DELETE FROM alimento WHERE nome = ?`);
    stmt.executeAsync(nome);
    atualizarAlimentos();
  };

  interface Alimento {
    nome: string;
    categoria_id: number;
    NomeCategoria: string;
  }

  const selecionarAlimentoAleatorio = (categoria: string) => {
    const allRows = db.getAllSync(
      `SELECT * FROM alimento JOIN categoria ON alimento.categoria_id = categoria.IdCategoria WHERE categoria.NomeCategoria = ?`,
      categoria
    );
    if (allRows.length > 0) {
      const indexAleatorio = Math.floor(Math.random() * allRows.length);
      const alimento: Alimento = allRows[indexAleatorio] as Alimento;
      return alimento;
    }
    return null;
  };

  const mostrarAlimentoAleatorio = () => {
    const proteina = selecionarAlimentoAleatorio("Proteina");
    const carboidrato = selecionarAlimentoAleatorio("Carboidrato");
    const legume = selecionarAlimentoAleatorio("Legume");
  };

  const [alimentoProteina, setAlimentoProteina] = useState<Alimento | null>(
    null
  );
  const [alimentoCarboidrato, setAlimentoCarboidrato] =
    useState<Alimento | null>(null);
  const [alimentoLegume, setAlimentoLegume] = useState<Alimento | null>(null);
  const [alimentoProteina1, setAlimentoProteina1] = useState<Alimento | null>(
    null
  );
  const [alimentoCarboidrato1, setAlimentoCarboidrato1] =
    useState<Alimento | null>(null);
  const [alimentoLegume1, setAlimentoLegume1] = useState<Alimento | null>(null);
  const [alimentoProteina2, setAlimentoProteina2] = useState<Alimento | null>(
    null
  );
  const [alimentoCarboidrato2, setAlimentoCarboidrato2] =
    useState<Alimento | null>(null);
  const [alimentoLegume2, setAlimentoLegume2] = useState<Alimento | null>(null);

  const [alimentoProteina3, setAlimentoProteina3] = useState<Alimento | null>(
    null
  );
  const [alimentoCarboidrato3, setAlimentoCarboidrato3] =
    useState<Alimento | null>(null);
  const [alimentoLegume3, setAlimentoLegume3] = useState<Alimento | null>(null);

  const [alimentoProteina4, setAlimentoProteina4] = useState<Alimento | null>(
    null
  );
  const [alimentoCarboidrato4, setAlimentoCarboidrato4] =
    useState<Alimento | null>(null);
  const [alimentoLegume4, setAlimentoLegume4] = useState<Alimento | null>(null);

  useEffect(() => {
    setAlimentoProteina(selecionarAlimentoAleatorio("Proteina"));
    setAlimentoCarboidrato(selecionarAlimentoAleatorio("Carboidrato"));
    setAlimentoLegume(selecionarAlimentoAleatorio("Legume"));

    setAlimentoProteina1(selecionarAlimentoAleatorio("Proteina"));
    setAlimentoCarboidrato1(selecionarAlimentoAleatorio("Carboidrato"));
    setAlimentoLegume1(selecionarAlimentoAleatorio("Legume"));

    setAlimentoProteina2(selecionarAlimentoAleatorio("Proteina"));
    setAlimentoCarboidrato2(selecionarAlimentoAleatorio("Carboidrato"));
    setAlimentoLegume2(selecionarAlimentoAleatorio("Legume"));

    setAlimentoProteina3(selecionarAlimentoAleatorio("Proteina"));
    setAlimentoCarboidrato3(selecionarAlimentoAleatorio("Carboidrato"));
    setAlimentoLegume3(selecionarAlimentoAleatorio("Legume"));

    setAlimentoProteina4(selecionarAlimentoAleatorio("Proteina"));
    setAlimentoCarboidrato4(selecionarAlimentoAleatorio("Carboidrato"));
    setAlimentoLegume4(selecionarAlimentoAleatorio("Legume"));
  }, []);

  const gerarSelecaoAleatoria = () => {
    setAlimentoProteina(selecionarAlimentoAleatorio("Proteina"));
    setAlimentoCarboidrato(selecionarAlimentoAleatorio("Carboidrato"));
    setAlimentoLegume(selecionarAlimentoAleatorio("Legume"));

    setAlimentoProteina1(selecionarAlimentoAleatorio("Proteina"));
    setAlimentoCarboidrato1(selecionarAlimentoAleatorio("Carboidrato"));
    setAlimentoLegume1(selecionarAlimentoAleatorio("Legume"));

    setAlimentoProteina2(selecionarAlimentoAleatorio("Proteina"));
    setAlimentoCarboidrato2(selecionarAlimentoAleatorio("Carboidrato"));
    setAlimentoLegume2(selecionarAlimentoAleatorio("Legume"));

    setAlimentoProteina3(selecionarAlimentoAleatorio("Proteina"));
    setAlimentoCarboidrato3(selecionarAlimentoAleatorio("Carboidrato"));
    setAlimentoLegume3(selecionarAlimentoAleatorio("Legume"));

    setAlimentoProteina4(selecionarAlimentoAleatorio("Proteina"));
    setAlimentoCarboidrato4(selecionarAlimentoAleatorio("Carboidrato"));
    setAlimentoLegume4(selecionarAlimentoAleatorio("Legume"));
  };
  return (
    <SafeAreaView style={[styles.container]}>

      <View style={{ justifyContent: "center", width: "90%", margin: 10, alignItems: "center", }}>
        <Text style={[styles.textTitulo]}>
          {/* Color scheme: {colorScheme} */}
          Cardápio Semanal
        </Text>
      </View>
      <ScrollView >
        <View style={{ width: "100%" }}>
          <View style={[styles.viewCard]}>
            <Text style={[styles.textBold, styles.textCard, styles.centerDay]}>Segunda</Text>
            <Text style={[styles.textCard, styles.textCenter]}>
              <Text style={styles.textBold}>Almoço: </Text>

              {alimentoProteina && alimentoCarboidrato && alimentoLegume
                ? alimentoProteina.nome
                :"Nenhum alimento encontrado"}{" "}
              {/* {alimentoProteina
              ? alimentoProteina.nome
              : "Nenhum alimento encontrado"}
            ,{" "}
            {alimentoCarboidrato
              ? alimentoCarboidrato.nome
              : "Nenhum alimento encontrado"}
            ,{" "}
            {alimentoLegume
              ? alimentoLegume.nome
              : "Nenhum alimento encontrado"} */}
            </Text>
            <Text style={[styles.textCard, styles.textCenter]}>
              <Text style={styles.textBold}>Janta: </Text>
              {alimentoProteina2
                ? alimentoProteina2.nome
                : "Nenhum alimento encontrado"}
              ,{" "}
              {alimentoCarboidrato2
                ? alimentoCarboidrato2.nome
                : "Nenhum alimento encontrado"}
              ,{" "}
              {alimentoLegume2
                ? alimentoLegume2.nome
                : "Nenhum alimento encontrado"}
            </Text>
          </View>
          <View style={[styles.viewCard]}>
            <Text style={[styles.textBold, styles.textCard, styles.centerDay]}>Terça</Text>
            <Text style={[styles.textCard, styles.textCenter]}>
              <Text style={styles.textBold}>Almoço: </Text>
              {alimentoProteina1
                ? alimentoProteina1.nome
                : "Nenhum alimento encontrado"}
              ,{" "}
              {alimentoCarboidrato1
                ? alimentoCarboidrato1.nome
                : "Nenhum alimento encontrado"}
              ,{" "}
              {alimentoLegume1
                ? alimentoLegume1.nome
                : "Nenhum alimento encontrado"}
            </Text>
            <Text style={[styles.textCard, styles.textCenter]}>
              <Text style={styles.textBold}>Janta: </Text>
              {alimentoProteina3
                ? alimentoProteina3.nome
                : "Nenhum alimento encontrado"}
              ,{" "}
              {alimentoCarboidrato3
                ? alimentoCarboidrato3.nome
                : "Nenhum alimento encontrado"}
              ,{" "}
              {alimentoLegume3
                ? alimentoLegume3.nome
                : "Nenhum alimento encontrado"}
            </Text>
          </View>
          <View style={[styles.viewCard]}>
            <Text style={[styles.textBold, styles.textCard, styles.centerDay]}>Quarta</Text>
            <Text style={[styles.textCard, styles.textCenter]}>
              <Text style={styles.textBold}>Almoço: </Text>
              {alimentoProteina2
                ? alimentoProteina2.nome
                : "Nenhum alimento encontrado"}
              ,{" "}
              {alimentoCarboidrato2
                ? alimentoCarboidrato2.nome
                : "Nenhum alimento encontrado"}
              ,{" "}
              {alimentoLegume2
                ? alimentoLegume2.nome
                : "Nenhum alimento encontrado"}
            </Text>
            <Text style={[styles.textCard, styles.textCenter]}>
              <Text style={styles.textBold}>Janta: </Text>
              {alimentoProteina4
                ? alimentoProteina4.nome
                : "Nenhum alimento encontrado"}
              ,{" "}
              {alimentoCarboidrato4
                ? alimentoCarboidrato4.nome
                : "Nenhum alimento encontrado"}
              ,{" "}
              {alimentoLegume4
                ? alimentoLegume4.nome
                : "Nenhum alimento encontrado"}
            </Text>
          </View>
          <View style={[styles.viewCard]}>
            <Text style={[styles.textBold, styles.textCard, styles.centerDay]}>Quinta</Text>
            <Text style={[styles.textCard, styles.textCenter]}>
              <Text style={styles.textBold}>Almoço: </Text>
              {alimentoProteina3
                ? alimentoProteina3.nome
                : "Nenhum alimento encontrado"}
              ,{" "}
              {alimentoCarboidrato3
                ? alimentoCarboidrato3.nome
                : "Nenhum alimento encontrado"}
              ,{" "}
              {alimentoLegume3
                ? alimentoLegume3.nome
                : "Nenhum alimento encontrado"}
            </Text>
            <Text style={[styles.textCard, styles.textCenter]}>
              <Text style={styles.textBold}>Janta: </Text>
              {alimentoProteina
                ? alimentoProteina.nome
                : "Nenhum alimento encontrado"}
              ,{" "}
              {alimentoCarboidrato
                ? alimentoCarboidrato.nome
                : "Nenhum alimento encontrado"}
              ,{" "}
              {alimentoLegume
                ? alimentoLegume.nome
                : "Nenhum alimento encontrado"}
            </Text>
          </View>
          <View style={[styles.viewCard]}>
            <Text style={[styles.textBold, styles.textCard, styles.centerDay]}>Sexta</Text>
            <Text style={[styles.textCard, styles.textCenter]}>
              <Text style={styles.textBold}>Almoço: </Text>
              {alimentoProteina4
                ? alimentoProteina4.nome
                : "Nenhum alimento encontrado"}
              ,{" "}
              {alimentoCarboidrato4
                ? alimentoCarboidrato4.nome
                : "Nenhum alimento encontrado"}
              ,{" "}
              {alimentoLegume4
                ? alimentoLegume4.nome
                : "Nenhum alimento encontrado"}
            </Text>
            <Text style={[styles.textCard, styles.textCenter]}>
              <Text style={styles.textBold}>Janta: </Text>
              {alimentoProteina1
                ? alimentoProteina1.nome
                : "Nenhum alimento encontrado"}
              ,{" "}
              {alimentoCarboidrato1
                ? alimentoCarboidrato1.nome
                : "Nenhum alimento encontrado"}
              ,{" "}
              {alimentoLegume1
                ? alimentoLegume1.nome
                : "Nenhum alimento encontrado"}
            </Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <Pressable style={styles.botao} onPress={gerarSelecaoAleatoria}>
          <Text style={styles.textBotao}>Gerar nova seleção</Text>
        </Pressable>
        <Pressable style={styles.botao} onPress={mostrarAlimentoAleatorio}>
          <Text style={styles.textBotao}>Gerar seleção</Text>
        </Pressable>
        {/* <Button color={"#6ab7e2"} title="Gerar nova seleção" onPress={gerarSelecaoAleatoria} /> */}
        {/* <Button color={"#6ab7e2"} title="Gerar" onPress={mostrarAlimentoAleatorio} /> */}
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  textTitulo: {
    fontWeight: "bold",
    fontSize: 20,
    color: '#09371D',
    marginBottom: 10,
  },
  textBold: {
    fontWeight: "bold",
  },
  centerDay: {
    textAlign: "center",
  },
  textCenter: {
    textAlign: "center",
  },
  textCard: {
    color: '#F8F9FA',
    fontSize: 15,
    // textAlign:"center",

    // padding: 15
  },
  viewCard: {
    backgroundColor: "#297B4E",
    justifyContent: "center",
    padding: 20,
    borderRadius: 10,
    minWidth: "100%",
    height: "auto",
    marginVertical: 5,

  },
  container: {
    // 
    padding: 30,
    flex: 1,
    alignItems: "center",
    backgroundColor: '#f7f7f8',
    margin: 0,

  },

  botao: {
    borderRadius: 15,
    marginTop: 30,
    padding: 10,
    elevation: 2,
    backgroundColor: "#297B4E",
  },
  textBotao: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row", // Alinha os botões horizontalmente
    justifyContent: "space-evenly",
    width: "100%",
    margin: 0,
  },
  text: {
    fontSize: 15,
  },
});
