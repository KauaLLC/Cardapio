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
import { useIsFocused } from "@react-navigation/native";




const db = openDatabaseSync("mydb2.db");

export default function index() {
  useEffect(() => {
    atualizarCategorias();
    atualizarAlimentos();
  }, []);


  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [categoriaId, setCategoriaId] = useState<number>(0);
  const [alimentos, setAlimentos] = useState<Alimento[]>([]);
  const [nomeAlimento, setNomeAlimento] = useState<string>("");
  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      atualizarAlimentos();
    }
  }, [isFocused]);

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
  interface Alimento {
    nome: string;
    IdCategoria: number;
    NomeCategoria: string;
  }

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
    const Proteínas = selecionarAlimentoAleatorio("Proteínas");
    const Carboidratos = selecionarAlimentoAleatorio("Carboidratos");
    const Legumes = selecionarAlimentoAleatorio("Legumes");
  };

  const [alimentoProteínas, setAlimentoProteínas] = useState<Alimento | null>(
    null
  );
  const [alimentoCarboidratos, setAlimentoCarboidratos] =
    useState<Alimento | null>(null);
  const [alimentoLegumes, setAlimentoLegumes] = useState<Alimento | null>(null);
  const [alimentoProteínas1, setAlimentoProteínas1] = useState<Alimento | null>(
    null
  );
  const [alimentoCarboidratos1, setAlimentoCarboidratos1] =
    useState<Alimento | null>(null);
  const [alimentoLegumes1, setAlimentoLegumes1] = useState<Alimento | null>(null);
  const [alimentoProteínas2, setAlimentoProteínas2] = useState<Alimento | null>(
    null
  );
  const [alimentoCarboidratos2, setAlimentoCarboidratos2] =
    useState<Alimento | null>(null);
  const [alimentoLegumes2, setAlimentoLegumes2] = useState<Alimento | null>(null);

  const [alimentoProteínas3, setAlimentoProteínas3] = useState<Alimento | null>(
    null
  );
  const [alimentoCarboidratos3, setAlimentoCarboidratos3] =
    useState<Alimento | null>(null);
  const [alimentoLegumes3, setAlimentoLegumes3] = useState<Alimento | null>(null);

  const [alimentoProteínas4, setAlimentoProteínas4] = useState<Alimento | null>(
    null
  );
  const [alimentoCarboidratos4, setAlimentoCarboidratos4] =
    useState<Alimento | null>(null);
  const [alimentoLegumes4, setAlimentoLegumes4] = useState<Alimento | null>(null);
  const [alimentoProteínas5, setAlimentoProteínas5] = useState<Alimento | null>(
    null
  );
  const [alimentoCarboidratos5, setAlimentoCarboidratos5] =
    useState<Alimento | null>(null);
  const [alimentoLegumes5, setAlimentoLegumes5] = useState<Alimento | null>(null);
  const [alimentoProteínas6, setAlimentoProteínas6] = useState<Alimento | null>(
    null
  );
  const [alimentoCarboidratos6, setAlimentoCarboidratos6] =
    useState<Alimento | null>(null);
  const [alimentoLegumes6, setAlimentoLegumes6] = useState<Alimento | null>(null);
  const [alimentoProteínas7, setAlimentoProteínas7] = useState<Alimento | null>(
    null
  );
  const [alimentoCarboidratos7, setAlimentoCarboidratos7] =
    useState<Alimento | null>(null);
  const [alimentoLegumes7, setAlimentoLegumes7] = useState<Alimento | null>(null);
  const [alimentoProteínas8, setAlimentoProteínas8] = useState<Alimento | null>(
    null
  );
  const [alimentoCarboidratos8, setAlimentoCarboidratos8] =
    useState<Alimento | null>(null);
  const [alimentoLegumes8, setAlimentoLegumes8] = useState<Alimento | null>(null);
  const [alimentoProteínas9, setAlimentoProteínas9] = useState<Alimento | null>(
    null
  );
  const [alimentoCarboidratos9, setAlimentoCarboidratos9] =
    useState<Alimento | null>(null);
  const [alimentoLegumes9, setAlimentoLegumes9] = useState<Alimento | null>(null);

  useEffect(() => {
    setAlimentoProteínas(selecionarAlimentoAleatorio("Proteínas"));
    setAlimentoCarboidratos(selecionarAlimentoAleatorio("Carboidratos"));
    setAlimentoLegumes(selecionarAlimentoAleatorio("Legumes"));

    setAlimentoProteínas1(selecionarAlimentoAleatorio("Proteínas"));
    setAlimentoCarboidratos1(selecionarAlimentoAleatorio("Carboidratos"));
    setAlimentoLegumes1(selecionarAlimentoAleatorio("Legumes"));

    setAlimentoProteínas2(selecionarAlimentoAleatorio("Proteínas"));
    setAlimentoCarboidratos2(selecionarAlimentoAleatorio("Carboidratos"));
    setAlimentoLegumes2(selecionarAlimentoAleatorio("Legumes"));

    setAlimentoProteínas3(selecionarAlimentoAleatorio("Proteínas"));
    setAlimentoCarboidratos3(selecionarAlimentoAleatorio("Carboidratos"));
    setAlimentoLegumes3(selecionarAlimentoAleatorio("Legumes"));

    setAlimentoProteínas4(selecionarAlimentoAleatorio("Proteínas"));
    setAlimentoCarboidratos4(selecionarAlimentoAleatorio("Carboidratos"));
    setAlimentoLegumes4(selecionarAlimentoAleatorio("Legumes"));

    setAlimentoProteínas5(selecionarAlimentoAleatorio("Proteínas"));
    setAlimentoCarboidratos5(selecionarAlimentoAleatorio("Carboidratos"));
    setAlimentoLegumes5(selecionarAlimentoAleatorio("Legumes"));
  
    setAlimentoProteínas6(selecionarAlimentoAleatorio("Proteínas"));
    setAlimentoCarboidratos6(selecionarAlimentoAleatorio("Carboidratos"));
    setAlimentoLegumes6(selecionarAlimentoAleatorio("Legumes"));

    setAlimentoProteínas7(selecionarAlimentoAleatorio("Proteínas"));
    setAlimentoCarboidratos7(selecionarAlimentoAleatorio("Carboidratos"));
    setAlimentoLegumes7(selecionarAlimentoAleatorio("Legumes"));

    setAlimentoProteínas8(selecionarAlimentoAleatorio("Proteínas"));
    setAlimentoCarboidratos8(selecionarAlimentoAleatorio("Carboidratos"));
    setAlimentoLegumes8(selecionarAlimentoAleatorio("Legumes"));

    setAlimentoProteínas9(selecionarAlimentoAleatorio("Proteínas"));
    setAlimentoCarboidratos9(selecionarAlimentoAleatorio("Carboidratos"));
    setAlimentoLegumes9(selecionarAlimentoAleatorio("Legumes"));
  }, []);

  const gerarSelecaoAleatoria = () => {
    setAlimentoProteínas(selecionarAlimentoAleatorio("Proteínas"));
    setAlimentoCarboidratos(selecionarAlimentoAleatorio("Carboidratos"));
    setAlimentoLegumes(selecionarAlimentoAleatorio("Legumes"));

    setAlimentoProteínas1(selecionarAlimentoAleatorio("Proteínas"));
    setAlimentoCarboidratos1(selecionarAlimentoAleatorio("Carboidratos"));
    setAlimentoLegumes1(selecionarAlimentoAleatorio("Legumes"));

    setAlimentoProteínas2(selecionarAlimentoAleatorio("Proteínas"));
    setAlimentoCarboidratos2(selecionarAlimentoAleatorio("Carboidratos"));
    setAlimentoLegumes2(selecionarAlimentoAleatorio("Legumes"));

    setAlimentoProteínas3(selecionarAlimentoAleatorio("Proteínas"));
    setAlimentoCarboidratos3(selecionarAlimentoAleatorio("Carboidratos"));
    setAlimentoLegumes3(selecionarAlimentoAleatorio("Legumes"));

    setAlimentoProteínas4(selecionarAlimentoAleatorio("Proteínas"));
    setAlimentoCarboidratos4(selecionarAlimentoAleatorio("Carboidratos"));
    setAlimentoLegumes4(selecionarAlimentoAleatorio("Legumes"));

    setAlimentoProteínas5(selecionarAlimentoAleatorio("Proteínas"));
    setAlimentoCarboidratos5(selecionarAlimentoAleatorio("Carboidratos"));
    setAlimentoLegumes5(selecionarAlimentoAleatorio("Legumes"));

    setAlimentoProteínas6(selecionarAlimentoAleatorio("Proteínas"));
    setAlimentoCarboidratos6(selecionarAlimentoAleatorio("Carboidratos"));
    setAlimentoLegumes6(selecionarAlimentoAleatorio("Legumes"));

    setAlimentoProteínas7(selecionarAlimentoAleatorio("Proteínas"));
    setAlimentoCarboidratos7(selecionarAlimentoAleatorio("Carboidratos"));
    setAlimentoLegumes7(selecionarAlimentoAleatorio("Legumes"));

    setAlimentoProteínas8(selecionarAlimentoAleatorio("Proteínas"));
    setAlimentoCarboidratos8(selecionarAlimentoAleatorio("Carboidratos"));
    setAlimentoLegumes8(selecionarAlimentoAleatorio("Legumes"));

    setAlimentoProteínas9(selecionarAlimentoAleatorio("Proteínas"));
    setAlimentoCarboidratos9(selecionarAlimentoAleatorio("Carboidratos"));
    setAlimentoLegumes9(selecionarAlimentoAleatorio("Legumes"));
  };

  const ScrollCard = () => {
    return (
      <View style={{ width: "90%", marginHorizontal: 15, justifyContent: 'center', height: "auto", padding: 0 }}>
        <View style={[styles.viewCard]}>
          <Text style={[styles.textBold, styles.textCard, styles.centerDay]}>Segunda</Text>
          <Text style={[styles.textCard, styles.textCenter]}>
            <Text style={styles.textBold}>Almoço: </Text>

            {alimentoProteínas
              ? alimentoProteínas.nome
              : "Nenhum alimento encontrado"}
            ,{" "}
            {alimentoCarboidratos
              ? alimentoCarboidratos.nome
              : "Nenhum alimento encontrado"}
            ,{" "}
            {alimentoLegumes
              ? alimentoLegumes.nome
              : "Nenhum alimento encontrado"}



          </Text>
          <Text style={[styles.textCard, styles.textCenter]}>
            <Text style={styles.textBold}>Janta: </Text>
            {alimentoProteínas5
              ? alimentoProteínas5.nome
              : "Nenhum alimento encontrado"}
            ,{" "}
            {alimentoCarboidratos5
              ? alimentoCarboidratos5.nome
              : "Nenhum alimento encontrado"}
            ,{" "}
            {alimentoLegumes5
              ? alimentoLegumes5.nome
              : "Nenhum alimento encontrado"}
          </Text>
        </View>
        <View style={[styles.viewCard]}>
          <Text style={[styles.textBold, styles.textCard, styles.centerDay]}>Terça</Text>
          <Text style={[styles.textCard, styles.textCenter]}>
            <Text style={styles.textBold}>Almoço: </Text>
            {alimentoProteínas1
              ? alimentoProteínas1.nome
              : "Nenhum alimento encontrado"}
            ,{" "}
            {alimentoCarboidratos1
              ? alimentoCarboidratos1.nome
              : "Nenhum alimento encontrado"}
            ,{" "}
            {alimentoLegumes1
              ? alimentoLegumes1.nome
              : "Nenhum alimento encontrado"}
          </Text>
          <Text style={[styles.textCard, styles.textCenter]}>
            <Text style={styles.textBold}>Janta: </Text>
            {alimentoProteínas6
              ? alimentoProteínas6.nome
              : "Nenhum alimento encontrado"}
            ,{" "}
            {alimentoCarboidratos6
              ? alimentoCarboidratos6.nome
              : "Nenhum alimento encontrado"}
            ,{" "}
            {alimentoLegumes6
              ? alimentoLegumes6.nome
              : "Nenhum alimento encontrado"}
          </Text>
        </View>
        <View style={[styles.viewCard]}>
          <Text style={[styles.textBold, styles.textCard, styles.centerDay]}>Quarta</Text>
          <Text style={[styles.textCard, styles.textCenter]}>
            <Text style={styles.textBold}>Almoço: </Text>
            {alimentoProteínas2
              ? alimentoProteínas2.nome
              : "Nenhum alimento encontrado"}
            ,{" "}
            {alimentoCarboidratos2
              ? alimentoCarboidratos2.nome
              : "Nenhum alimento encontrado"}
            ,{" "}
            {alimentoLegumes2
              ? alimentoLegumes2.nome
              : "Nenhum alimento encontrado"}
          </Text>
          <Text style={[styles.textCard, styles.textCenter]}>
            <Text style={styles.textBold}>Janta: </Text>
            {alimentoProteínas7
              ? alimentoProteínas7.nome
              : "Nenhum alimento encontrado"}
            ,{" "}
            {alimentoCarboidratos7
              ? alimentoCarboidratos7.nome
              : "Nenhum alimento encontrado"}
            ,{" "}
            {alimentoLegumes7
              ? alimentoLegumes7.nome
              : "Nenhum alimento encontrado"}
          </Text>
        </View>
        <View style={[styles.viewCard]}>
          <Text style={[styles.textBold, styles.textCard, styles.centerDay]}>Quinta</Text>
          <Text style={[styles.textCard, styles.textCenter]}>
            <Text style={styles.textBold}>Almoço: </Text>
            {alimentoProteínas3
              ? alimentoProteínas3.nome
              : "Nenhum alimento encontrado"}
            ,{" "}
            {alimentoCarboidratos3
              ? alimentoCarboidratos3.nome
              : "Nenhum alimento encontrado"}
            ,{" "}
            {alimentoLegumes3
              ? alimentoLegumes3.nome
              : "Nenhum alimento encontrado"}
          </Text>
          <Text style={[styles.textCard, styles.textCenter]}>
            <Text style={styles.textBold}>Janta: </Text>
            {alimentoProteínas8
              ? alimentoProteínas8.nome
              : "Nenhum alimento encontrado"}
            ,{" "}
            {alimentoCarboidratos8
              ? alimentoCarboidratos8.nome
              : "Nenhum alimento encontrado"}
            ,{" "}
            {alimentoLegumes8
              ? alimentoLegumes8.nome
              : "Nenhum alimento encontrado"}
          </Text>
        </View>
        <View style={[styles.viewCardsexta]}>
          <Text style={[styles.textBold, styles.textCard, styles.centerDay]}>Sexta</Text>
          <Text style={[styles.textCard, styles.textCenter]}>
            <Text style={styles.textBold}>Almoço: </Text>
            {alimentoProteínas4
              ? alimentoProteínas4.nome
              : "Nenhum alimento encontrado"}
            ,{" "}
            {alimentoCarboidratos4
              ? alimentoCarboidratos4.nome
              : "Nenhum alimento encontrado"}
            ,{" "}
            {alimentoLegumes4
              ? alimentoLegumes4.nome
              : "Nenhum alimento encontrado"}
          </Text>
          <Text style={[styles.textCard, styles.textCenter]}>
            <Text style={styles.textBold}>Janta: </Text>
            {alimentoProteínas9
              ? alimentoProteínas9.nome
              : "Nenhum alimento encontrado"}
            ,{" "}
            {alimentoCarboidratos9
              ? alimentoCarboidratos9.nome
              : "Nenhum alimento encontrado"}
            ,{" "}
            {alimentoLegumes9
              ? alimentoLegumes9.nome
              : "Nenhum alimento encontrado"}
          </Text>
        </View>
      </View>
    )
  }

  const ButtonDisable = () => {
    const QuantAlimen = Array(alimentos.length).length
    const QuantCateg = Array(categorias.length).length
    if (QuantAlimen <= 8) {
      return (
        <View style={styles.buttonContainer}>
          <Pressable style={styles.botaodisabled} >
            <Text style={styles.textBotao} disabled onPress={gerarSelecaoAleatoria}>Gerar nova seleção</Text>
          </Pressable>
        </View>
      );
    }else if(QuantAlimen >= 9){
      return(
        <View style={styles.buttonContainer}>
          <Pressable style={styles.botao} >
            <Text style={styles.textBotao} onPress={gerarSelecaoAleatoria}>Gerar nova seleção</Text>
          </Pressable>

        </View>
      );
    }
  }
  const QuantAlimen = Array(alimentos.length).length
  const QuantCateg = Array(categorias.length).length


  const VerificaAlimentos = () => {
    if (QuantAlimen <= 8) {
      return (
        <View style={styles.ContainerAlert}>
          <View style={[styles.AlertCard,]}>
            <Text style={[styles.textWhite, styles.textBotao]}>Insira pelo menos 3 alimentos em cada categoria para gerar o cardápio</Text>
          </View>
        </View>
      );

    } else if (QuantAlimen >= 9) {
      return (
        <View >
          <ScrollCard />
        </View>
      );
    }
  }
  return (
    <SafeAreaView style={[styles.container]}>

      <View style={{ justifyContent: "center", width: "90%", margin: 10, alignItems: "center", }}>
        <Text style={[styles.textTitulo]}>
          {/* Color scheme: {colorScheme} */}
          Cardápio Semanal
        </Text>
      </View>

      <ScrollView >
        <VerificaAlimentos />
      </ScrollView>
      <ButtonDisable />



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
  viewCardsexta: {
    backgroundColor: "#297B4E",
    justifyContent: "center",
    padding: 20,
    borderRadius: 10,
    minWidth: "100%",
    height: "auto",
    marginVertical: 10,
    marginBottom:30

  },

  viewCard: {
    backgroundColor: "#297B4E",
    justifyContent: "center",
    padding: 20,
    borderRadius: 10,
    minWidth: "100%",
    height: "auto",
    marginVertical: 10,

  },
  AlertCard: {
    justifyContent: 'center',
    alignItems: "center",
    backgroundColor: "#297B4E",
    height: 70,
    width: 300,
    borderRadius: 15
  },
  ContainerAlert: {
    flexDirection: "column",
    justifyContent: "space-between",
    minHeight: '100%',
    paddingBottom: 2
  },
  container: {
    padding: 15,
    flex: 1,
    alignItems: "center",
    backgroundColor: '#f7f7f8',
    margin: 0,

  },
  botaodisabled: {
    borderRadius: 15,
    marginBottom: 0,
    padding: 10,
    elevation: 2,
    backgroundColor: "#d2d2d2",
    width:"90%"
  },
  botao: {
    borderRadius: 15,
    marginBottom: 0,
    marginTop:5,
    padding: 10,
    elevation: 2,
    backgroundColor: "#297B4E",
    width:"90%"
    
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
    alignItems: "center",
    
  },
  text: {
    fontSize: 15,
  },
  textWhite: {
    color: "#fff"
  },
});
