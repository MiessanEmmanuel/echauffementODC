import axios from "axios";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { Button, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FlatList, GestureHandlerRootView } from "react-native-gesture-handler";
import Feather from '@expo/vector-icons/Feather';
import { SafeAreaView } from "react-native-safe-area-context";


export default function Index() {

  interface Ordinateur {
    id: number | string;
    nom: string;
    sizeScreen: number;
    price: number;
    category: number;

    // ajoutez d'autres propriétés si nécessaire
  }
  const [ordinateurs, setOrdinateurs] = useState<Ordinateur[]>([])
  const [loading, setLoading] = useState(true);
  const [showModalDelete, setShowModalDelete] = useState(false)
  const [showModalEdit, setShowModalEdit] = useState(false)
  const [currentOrdinateur, setCurrentOrdinateur] = useState<Ordinateur>(ordinateurs[0])
  const [categories, setCategories] = useState([]);

  const fetchDataCategories = async () => {
    try {
      const response = await axios.get('http://192.168.1.6:8000/api/categories');
      const dataResponse = await response.data;
      setCategories(dataResponse.categories);
    } catch (error) {
      console.error('Erreur lors du chargement des ordinateurs :', error);
    }
  };

  const fetchDataOrdinateur = async () => {
    try {
      const response = await axios.get('http://192.168.1.6:8000/api/ordinateurs');
      const data = await response.data
      setOrdinateurs(data.ordinateurs)
      setLoading(false);
    } catch (error) {
      console.error('Imposible de charger les éléments', error)
      setLoading(false);
    }
  }
 
  useEffect(() => {
    fetchDataCategories()
  }, [])

  useEffect(() => {
    fetchDataOrdinateur()
  }, [])
  
  const handleDelete = async (ordinateur: Ordinateur) => {
    try {
      const response = await axios.delete(`http://192.168.1.6:8000/api/ordinateurs/${ordinateur.id}`);
      const data = await response.data;
      console.log(data.message)
      setShowModalDelete(false)
      fetchDataOrdinateur()
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'ordinateur :', error);
    }


  };
  const handleEdit = async (ordinateur: Ordinateur) => {
    try {
      const response = await axios.put(`http://192.168.1.6:8000/api/ordinateurs/${ordinateur.id}`, /* data */);
      const dataResponse = await response.data;
      console.log(dataResponse)
      setShowModalEdit(false)

    } catch (error) {
      console.error('Erreur lors de la suppression de l\'ordinateur :', error);
    }
  }

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Chargement...</Text>
      </View>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <View
          style={{
            flex: 1,
            backgroundColor: "#444343"
          }}
        >

          <View style={styles.header}>
            <Text style={styles.title}>Listes des ordinateurs</Text>
          </View>

          <View
                style={{
                  flexDirection: "row",

                  width: "100%",
                  padding: 9,

                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "gray",

                }}>
                <Text style={{ flex: 1, fontWeight:"bold" }}>Nom</Text>
                <Text style={{ flex: 1, fontWeight:"bold" }}>Taille d'écran</Text>
                <Text style={{ flex: 1, fontWeight:"bold" }}>Prix</Text>
               
              </View>
          <FlatList
            data={ordinateurs}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View
                style={{
                  flexDirection: "row",

                  width: "100%",
                  padding: 9,

                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "gray",

                }}>
                <Text style={{ flex: 1 }}>{item.nom}</Text>
                <Text style={{ flex: 1 }}>{item.sizeScreen} pouces</Text>
                <Text style={{ flex: 1 }}>{item.price} Fcfa</Text>
                <Text style={{ rowGap: 5, alignItems: "center" }}>
                  <TouchableOpacity
                    onPress={() => {
                      setShowModalEdit(true)
                      setCurrentOrdinateur(item)
                    }}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      borderRadius: 5,
                    }}
                  >
                    <Feather name="edit" size={20} color="black" style={{ marginRight: 8 }} />

                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setShowModalDelete(true)
                      setCurrentOrdinateur(item)
                    }}

                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      borderRadius: 5,
                    }}
                  >
                    <Feather name="trash-2" size={20} color="black" />


                  </TouchableOpacity>
                </Text>
              </View>
            )}
          />

        </View>
      </GestureHandlerRootView>




      {/* edition */}
      <Modal
        animationType="fade" // ou "fade"
        transparent={true}
        visible={showModalEdit}
        onRequestClose={() => setShowModalEdit(false)} // Android back button
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={{ marginBottom: 20 }}>Ceci est un modal 🎉</Text>
            <Button title="Fermer" onPress={() => setShowModalEdit(false)} />
          </View>
        </View>
      </Modal>

      {/* suppression */}
      <Modal
        animationType="fade" // ou "fade"
        transparent={true}
        visible={showModalDelete}
        onRequestClose={() => setShowModalDelete(false)} // Android back button
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={{ marginBottom: 20, fontWeight: "bold", textAlign: "center" }}>Voulez-vous supprimer cet équipement {currentOrdinateur && currentOrdinateur.nom} ?</Text>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>

              <Button title="Fermer" onPress={() => setShowModalDelete(false)} />
              <Button title="Supprimer" onPress={() => handleDelete(currentOrdinateur)} />

            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  link: { fontSize: 12, fontWeight: 'bold', padding: 9, },
  header: { backgroundColor: "black", fontSize: 18, textAlign: "center", padding: 16 },
  container: { flex: 1 },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    color: "white"
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: 300,
    alignItems: 'center',
  },
})
