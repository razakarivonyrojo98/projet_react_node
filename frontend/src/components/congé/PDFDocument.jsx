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
    padding: 40,
    fontSize: 12,
    fontFamily: "Times-Roman",
    lineHeight: 1.5,
  },
  header: {
    textAlign: "right",
    marginBottom: 20,
  },
  section: {
    marginBottom: 10,
  },
  bold: {
    fontWeight: "bold",
  },
  textIndent: {
    textIndent: 30,
  },
  signature: {
    marginTop: 30,
    textAlign: "right",
  },
});


const PDFDocument = () => {
  return (
    <>
       <Document>
    <Page size="A4" style={styles.page}>
      {/* En-tête */}
      <View style={styles.header}>
        <Text>Fianarantsoa le,</Text>
        <Text>NOM : RAKOTOARIVONY</Text>
        <Text>PRENOMS : Jean Gabriel</Text>
        <Text>IM : 269 531</Text>
        <Text>
          CORPS ET GRADE : Instituteur « C » PCE 1ère Échelon
        </Text>
        <Text>INDICE : 1020</Text>
        <Text>IMPUTATION BUDGETAIRE : 08 811 130</Text>
        <Text>En service : au Bureau de la DRENETP HAUTE MATSIATRA</Text>
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
      <View style={styles.section}>
        <Text style={styles.bold}>OBJET :</Text>
        <Text>Demande de décision de congé Annuel</Text>
      </View>

      {/* Corps */}
      <View style={styles.section}>
        <Text> Monsieur Le PREFET,</Text>
        <Text style={styles.textIndent}>
          J'ai l'honneur de solliciter votre haute bienveillance de bien vouloir
          m'octroyer une décision de congé annuel de TRENTE JOURS (30 jours) avec
          solde entière au titre de l'année 2020 pour jouir à FIANARANTSOA et
          AMBALAVAO.
        </Text>
        <Text style={styles.textIndent}>
          Dans l'attente d'une suite favorable de votre part, Je vous prie
          d'agréer Monsieur mes sentiments respectueux et dévoués.
        </Text>
      </View>

      {/* Signature */}
      <View style={styles.signature}>
        <Text>AVIS DU CHEF DE SERVICE :</Text>
        <Text>L’intéressé</Text>
        <Text style={{ marginTop: 50 }}>
          RAKOTOARIVONY Jean Gabriel
        </Text>
      </View>
    </Page>
  </Document> 
    </>
  )
}

export default PDFDocument