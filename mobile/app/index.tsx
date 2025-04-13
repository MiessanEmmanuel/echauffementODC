import axios from "axios";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { Button, Keyboard, Modal, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { FlatList, GestureHandlerRootView } from "react-native-gesture-handler";
import Feather from '@expo/vector-icons/Feather';
import { SafeAreaView } from "react-native-safe-area-context";


export default function Index() {

  interface Ordinateur {
    id: number | string;
    nom: string;
    annee: number;
    sizeScreen: number;
    price: number;
    category_id: number;

    // ajoutez d'autres propriétés si nécessaire
  }
  const [ordinateurs, setOrdinateurs] = useState<Ordinateur[]>([])
  const [loading, setLoading] = useState(true);
  const [showModalDelete, setShowModalDelete] = useState(false)
  const [showModalEdit, setShowModalEdit] = useState(false)
  const [currentOrdinateur, setCurrentOrdinateur] = useState<Ordinateur>(ordinateurs[0])
  const [showModalCreate, setShowModalCreate] = useState(false)
  const [categories, setCategories] = useState([]);
  const intialData = {
    nom: "",
    annee: 0,
    price: 0,
    sizeScreen: 0,
    category_id: 3,
  }
  const [data, setData] = useState(intialData)
  const handleCreate = async () => {
    try {
      console.log(data)
      const response = await axios.post(`http://192.168.1.6:8000/api/ordinateurs`, data);
      const dataResponse = await response.data;
      console.log(dataResponse)
      setShowModalCreate(false)
      fetchDataOrdinateur()
    } catch (error) {
      console.error('Erreur lors de la création de l\'ordinateur :', error);
      setShowModalCreate(false)
    }
    setData(intialData)
  }
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
      const dataResponse = await response.data
      setOrdinateurs(dataResponse.ordinateurs)
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
      setShowModalDelete(false)
    }


  };

  const handleEdit = async (ordinateur: Ordinateur) => {
    try {
      const response = await axios.put(`http://192.168.1.6:8000/api/ordinateurs/${ordinateur.id}`, data);
      const dataResponse = await response.data;
      console.log(dataResponse)
      setShowModalEdit(false)
      fetchDataOrdinateur()
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'ordinateur :', error);
      setShowModalEdit(false)

    }
    setData(intialData)
  }

  const handlShowModalEdit = (ordinateur: Ordinateur) => {
    setShowModalEdit(true)
    setCurrentOrdinateur(ordinateur)
    setData({
      nom: ordinateur.nom || "",
      annee: ordinateur.annee ?? 0,
      price: ordinateur.price ?? 0,
      sizeScreen: ordinateur.sizeScreen ?? 0,
      category_id: ordinateur.category_id ?? 0
    })
  }

  const handleChange = (field: string, value: string | number) => {
    setData(prev => ({
      ...prev,
      [field]: value
    })
    )
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
            <Button title="Ajouter un ordinateur" onPress={() => setShowModalCreate(true)} />
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
            <Text style={{ flex: 1, fontWeight: "bold" }}>Nom</Text>
            <Text style={{ flex: 1, fontWeight: "bold" }}>Taille d'écran</Text>
            <Text style={{ flex: 1, fontWeight: "bold" }}>Prix</Text>

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
                    onPress={() => handlShowModalEdit(item)}
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



      {/* creation */}
      <Modal
        animationType="fade" // ou "fade"
        transparent={true}
        visible={showModalCreate}
        onRequestClose={() => setShowModalCreate(false)} // Android back button
      >
        <View style={styles.modalBackground}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.modalContainer}>
              <View style={styles.formControl}>
                <Text style={styles.label}>Nom</Text>
                <TextInput
                  style={styles.input}
                  value={data.nom}
                  onChangeText={(text) => handleChange('nom', text)}
                  placeholder="Nom de l'ordinateur"
                   placeholderTextColor="#888"
                />
              </View>
              <View style={styles.formControl}>
                <Text style={styles.label}>Année</Text>
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  value={data.annee.toString()}
                  onChangeText={(text) => handleChange('annee', text)}
                  placeholder="Taille de l'écran"
                   placeholderTextColor="#888"
                />
              </View>
              <View style={styles.formControl}>
                <Text style={styles.label}>Taille d'écran</Text>
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  value={ data.sizeScreen.toString()}
                  onChangeText={(text) => handleChange('sizeScreen', text)}
                  placeholder="Année"
                  placeholderTextColor="#888"
                />
              </View>
              <View style={styles.formControl}>
                <Text style={styles.label}>Prix</Text>
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  value={data.price.toString()}
                  onChangeText={(text) => handleChange('price', text)}
                  placeholder="Prix"
                   placeholderTextColor="#888"
                />
              </View>

              <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <Button title="Fermer" onPress={() => setShowModalCreate(false)} />
                <Button title="Créer" onPress={handleCreate} />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </Modal>





      {/* edition */}
      <Modal
        animationType="fade" // ou "fade"
        transparent={true}
        visible={showModalEdit}
        onRequestClose={() => setShowModalEdit(false)} // Android back button
      >
        <View style={styles.modalBackground}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.modalContainer}>
              <View style={styles.formControl}>
                <Text style={styles.label}>Nom</Text>
                <TextInput
                  style={styles.input}
                  value={data.nom}
                  onChangeText={(text) => handleChange('nom', text)}
                  placeholder="Ton nom"
                />
              </View>
              <View style={styles.formControl}>
                <Text style={styles.label}>Année</Text>
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  value={data.annee.toString()}
                  onChangeText={(text) => handleChange('annee', text)}
                  placeholder="Année"
                />
              </View>
              <View style={styles.formControl}>
                <Text style={styles.label}>Taille d'écran</Text>
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  value={data.sizeScreen.toString()}
                  onChangeText={(text) => handleChange('sizeScreen', text)}
                  placeholder="Année"
                />
              </View>
              <View style={styles.formControl}>
                <Text style={styles.label}>Prix</Text>
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  value={data.price.toString()}
                  onChangeText={(text) => handleChange('price', text)}
                  placeholder="Prix"
                />
              </View>

              <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <Button title="Fermer" onPress={() => setShowModalEdit(false)} />
                <Button title="Éditer" onPress={() => handleEdit(currentOrdinateur)} />
              </View>
            </View>
          </TouchableWithoutFeedback>
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
    color: "white",
    marginBottom: 18,
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
  label: {
    marginTop: 10,
    marginBottom: 6,
    fontWeight: "600",
    fontSize: 16,

  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    marginBottom: 10,
    width: "100%"
  },
  formControl: {
    width: "100%"
  }
})
