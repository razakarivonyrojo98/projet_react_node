import React from 'react'

import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";

// Définir les styles du document
const styles = StyleSheet.create({
  page: {
    padding: 60,
    fontSize: 13,
    fontFamily: "Times-Roman",
    lineHeight: 1.5,
  },
  header: {
    textAlign: "right",
    marginLeft: 100,
    marginBottom: 10,
  },
  header1: {
    textAlign: "right",
    marginRight: 90,
    marginBottom: 20,
  },
  section: {
    marginBottom: 3,
    marginLeft:100
  },
  nom: {
    marginBottom: 3,
    marginRight:200
  },
  prenom: {
    marginBottom: 3,
    marginRight:173
  },
  im: {
   marginBottom: 3,
    marginRight:225
  },
  corps: {
    marginBottom: 3,
    marginRight:135
  },
  indice: {
    marginBottom: 3,
    marginRight:200
  },
  inputation: {
    marginBottom: 3,
    marginRight:50
  },
  service: {
    marginBottom: 10,
    marginRight:195
  },
  bold: {
    marginRight: 100,
    marginTop:10,
    marginBottom:10
  },
  textIndent: {
    textIndent: 30,
    marginTop:5,
    marginBottom:5
  },
  signature: {
    marginTop: 40,
    textAlign: "right",
    marginRight: 60, 
  },
  signature1: {
   display:"flex"
  },
});

const PDFDocument = ({ contrat }) => {
  return (
    <>
       <Document>
    <Page size="A4" style={styles.page}>
      {/* En-tête */}
      <Text style={styles.header1}>Fianarantsoa le,</Text>
      <View style={styles.header}>
        
        <Text style={styles.nom}>NOM : {contrat.name} </Text>
        <Text style={styles.prenom}>PRENOMS : {contrat.firstName} </Text>
        <Text style={styles.im}>IM : {contrat.Immatricule }</Text>
        <Text style={styles.corps}>CORPS ET GRADE : {contrat.corps} </Text>
        <Text style={styles.indice}>INDICE : 1020</Text>
        <Text style={styles.inputation}>IMPUTATION BUDGETAIRE : 08 811 130</Text>
        <Text style={styles.service}>En service : {contrat.services} </Text>
      </View>

      {/* Titre */}
      <View style={styles.section}>
        <Text style={{ textAlign: "center" }}>
          <Text style={styles.bold}>à</Text>
        </Text>
        <Text style={{ textAlign: "center" }}>
          <Text style={styles.bold}>Monsieur Le PREFET DE FIANARANTSOA</Text>
        </Text>
      </View>

      {/* Objet */}
      <View >
        <Text style={styles.bold}>OBJET : Demande de décision de congé Annuel</Text>
     
      </View>

      {/* Corps */}
      <View style={styles.section}>
        <Text> Monsieur Le PREFET,</Text>
        <Text style={styles.textIndent}>
          J'ai l'honneur de solliciter votre haute bienveillance de bien vouloir
          m'octroyer une décision de congé annuel de {contrat.duration} jour avec
          solde entière au titre de l'année 2020 pour jouir à {contrat.ciscolaire}
        </Text>
        <Text style={styles.textIndent}>
          Dans l'attente d'une suite favorable de votre part, Je vous prie
          d'agréer Monsieur mes sentiments respectueux et dévoués.
        </Text>
      </View>

      {/* Signature */}
      
      <View style={styles.signature}>
        <View style={styles.signature1}>
          <Text>AVIS DU CHEF DE SERVICE :</Text>
          <Text>L’intéressé</Text>
        </View>

        <Text style={{ marginTop: 50, marginRight:30 }}> 
          {contrat.name} {contrat.firstName}
        </Text>
      </View>
    </Page>
  </Document> 
    </>
  );
}

export default PDFDocument