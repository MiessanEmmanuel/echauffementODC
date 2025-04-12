import { useEffect, useState } from 'react'
import Header from './components/layouts/header'
import axios from 'axios';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid'

function App() {

  return (
    <>
      <Header />
      <OrdinateurList />

    </>
  )
}

export default App


const OrdinateurList = () => {
  const [ordinateurs, setOrdinateurs] = useState([])
  const [categories, setCategories] = useState([])
  const [showModalCreate, setShowModalCreate] = useState(false)

  const [data, setData] = useState({
    nom: '',
    annee: null,
    price: null,
    sizeScreen: null,
    category_id: null,
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/ordinateurs');
        const data = await response.data;
        setOrdinateurs(data.ordinateurs);
      } catch (error) {
        console.error('Erreur lors du chargement des ordinateurs :', error);
      }
    };
    fetchData();
  }, [ordinateurs])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/categories');
        const dataResponse = await response.data;
        setCategories(dataResponse.categories);
      } catch (error) {
        console.error('Erreur lors du chargement des ordinateurs :', error);
      }
    };
    fetchData()
  }, [])

  const handleChange = (e) => {
    setData(
      {
        ...data,
        [e.target.name]: e.target.value
      }
    )
  }

  const handleCreate = async () => {
    try {
      const response = await axios.post(`http://127.0.0.1:8000/api/ordinateurs`, data);
      const dataResponse = await response.data;
      console.log(dataResponse)
      setShowModalCreate(false)

    } catch (error) {
      console.error('Erreur lors de la suppression de l\'ordinateur :', error);
    }
  }

  return (
    <>
      <div className='flex justify-end bg-gray-700 px-5'>
        <button className='bg-green-600 hover:bg-green-500 text-white rounded-md px-3 py-2 hover:cursor-pointer' onClick={() => setShowModalCreate(true)}>
          Nouveau Produit
        </button>
      </div>
      <div class="relative overflow-x-auto">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">
                Nom du produit
              </th>
              <th scope="col" class="px-6 py-3">
                Taille d'écran
              </th>
              <th scope="col" class="px-6 py-3">
                Année
              </th>
              <th scope="col" class="px-6 py-3">
                Categorie
              </th>
              <th scope="col" class="px-6 py-3">
                Prix
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>

            {ordinateurs && ordinateurs.map((ordinateur, index) => (
              <OrdinateurRow ordinateur={ordinateur} key={index} />
            ))

            }
          </tbody>
        </table>
      </div>

      {showModalCreate && (

        <div className=' fixed inset-0 bg-gray-800/50 flex items-center justify-center'>
          <div className='bg-white rounded-md  min-w-md'>
            <div className=' mb-4 text-xl font-medium text-gray-800  py-5 px-8'>
              Création
            </div>
            <div className='px-7  mb-3'>
              <div className=' flex flex-col space-y-2  mb-3'>
                <label htmlFor="nom" className='text-gray-600 font-medium text-md'>Nom</label>
                <input type="text" name='nom' id="nom" className='py-2 px-3 text-gray-800  border border-gray-600/40' value={data.nom} onChange={handleChange} />
              </div>
              <div className=' flex flex-col space-y-2  mb-3'>
                <label htmlFor="sizeScreen" className='text-gray-600 font-medium text-md'>Taille de l'écran</label>
                <input type="number" name='sizeScreen' id="sizeScreen" className='py-2 px-3 text-gray-800  border border-gray-600/40' value={data.sizeScreen} onChange={handleChange} />
              </div>
              <div className=' flex flex-col space-y-2  mb-3'>
                <label htmlFor="category" className='text-gray-600 font-medium text-md'>Categorie</label>
                <select name="category_id" id="category" className='px-3 text-gray-800  border border-gray-600/40' value={data.category_id} onChange={handleChange}>
                  <option value="">Selectionnez une catégorie</option>
                  {categories.map((category, index) => (
                    <option value={category.id} key={index}>{category.nom}</option>
                  ))}

                </select>
              </div>
              <div className=' flex flex-col space-y-2  mb-3'>
                <label htmlFor="annee" className='text-gray-600 font-medium text-md'>Année </label>
                <input type="number" id="annee" name='annee' className='py-2  px-3 text-gray-800  border border-gray-600/40' value={data.annee} onChange={handleChange} />
              </div>
              <div className=' flex flex-col space-y-2  mb-3'>
                <label htmlFor="price" className='text-gray-600 font-medium text-md'>Prix </label>
                <input type="text" name='price' id="price" className='py-2  px-3 text-gray-800  border border-gray-600/40' value={data.price} onChange={handleChange} />
              </div>

            </div>
            <div className='bg-gray-100 flex items-center justify-around space-x-8 py-5   px-8'>
              <button className='bg-gray-600 hover:bg-gray-500 text-white rounded-md px-3 py-2 hover:cursor-pointer' onClick={() => setShowModalCreate(false)}> Annuler</button>
              <button className='bg-green-600 hover:bg-green-500 text-white rounded-md px-3 py-2 hover:cursor-pointer' onClick={handleCreate}> Créer</button>
            </div>
          </div>
        </div>

      )}

    </>
  )
}


const OrdinateurRow = ({ ordinateur }) => {

  const [showModalDelete, setShowModalDelete] = useState(false)
  const [showModalEdit, setShowModalEdit] = useState(false)
  const [categories, setCategories] = useState([]);

  const [data, setData] = useState({
    nom: ordinateur.nom,
    annee: ordinateur.annee,
    price: ordinateur.price,
    sizeScreen: ordinateur.sizeScreen,
    category_id: ordinateur.category_id,
  })
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/categories');
        const dataResponse = await response.data;
        setCategories(dataResponse.categories);
      } catch (error) {
        console.error('Erreur lors du chargement des ordinateurs :', error);
      }
    };
    fetchData()
  }, [])


  const handleDelete = async () => {
    try {
      const response = await axios.delete(`http://127.0.0.1:8000/api/ordinateurs/${ordinateur.id}`);
      const data = await response.data;
      console.log(data.message)
      setShowModalDelete(false)
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'ordinateur :', error);
    }


  };
  const handleEdit = async () => {
    try {
      const response = await axios.put(`http://127.0.0.1:8000/api/ordinateurs/${ordinateur.id}`, data);
      const dataResponse = await response.data;
      console.log(dataResponse)
      setShowModalEdit(false)

    } catch (error) {
      console.error('Erreur lors de la suppression de l\'ordinateur :', error);
    }
  }

  const handleChange = (e) => {
    setData(
      {
        ...data,
        [e.target.name]: e.target.value
      }
    )
  }

  return (
    <>
      <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">

        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white uppercase">
          {ordinateur.nom}
        </th>
        <td class="px-6 py-4">
          {ordinateur.sizeScreen} pouces

        </td>
        <td class="px-6 py-4">
          {ordinateur.annee}

        </td>
        <td class="px-6 py-4">
          {ordinateur.category.nom}
        </td>
        <td class="px-6 py-4">
          {ordinateur.price} Fcfa

        </td>
        <td class="px-6 py-4 flex items-center space-x-4">
          <button className='hover:cursor-pointer' onClick={() => setShowModalEdit(true)}>
            <PencilSquareIcon class="h-6 w-6 text-gray-500 hover:text-gray-300" />
          </button>
          <button onClick={() => setShowModalDelete(true)} className='hover:cursor-pointer'>
            <TrashIcon class="h-6 w-6 text-gray-500 hover:text-red-500" />
          </button>
        </td>
      </tr>


      {showModalDelete && (

        <div className=' fixed inset-0 bg-gray-800/50 flex items-center justify-center'>
          <div className='bg-white rounded-md  min-w-md'>
            <div className='text-center mb-4 text-xl font-medium text-gray-800  py-5 px-8'>
              Voulez-vous supprimer cet ordinateur ?
            </div>
            <div className='bg-gray-100 flex items-center justify-around space-x-8 py-5   px-8'>
              <button className='bg-gray-600 hover:bg-gray-500 text-white rounded-md px-3 py-2 hover:cursor-pointer' onClick={() => setShowModalDelete(false)}> Annuler</button>
              <button className='bg-red-600 hover:bg-red-500 text-white rounded-md px-3 py-2 hover:cursor-pointer' onClick={handleDelete}> Supprimer</button>

            </div>
          </div>
        </div>

      )}


      {showModalEdit && (

        <div className=' fixed inset-0 bg-gray-800/50 flex items-center justify-center'>
          <div className='bg-white rounded-md  min-w-md'>
            <div className=' mb-4 text-xl font-medium text-gray-800  py-5 px-8'>
              Edition {ordinateur.nom}
            </div>
            <div className='px-7  mb-3'>
              <div className=' flex flex-col space-y-2  mb-3'>
                <label htmlFor="nom" className='text-gray-600 font-medium text-md'>Nom</label>
                <input type="text" name='nom' id="nom" className='py-2 px-3 text-gray-800  border border-gray-600/40' value={data.nom} onChange={handleChange} />
              </div>
              <div className=' flex flex-col space-y-2  mb-3'>
                <label htmlFor="sizeScreen" className='text-gray-600 font-medium text-md'>Taille de l'écran</label>
                <input type="number" name='sizeScreen' id="sizeScreen" className='py-2 px-3 text-gray-800  border border-gray-600/40' value={data.sizeScreen} onChange={handleChange} />
              </div>
              <div className=' flex flex-col space-y-2  mb-3'>
                <label htmlFor="category" className='text-gray-600 font-medium text-md'>Categorie</label>
                <select name="category_id" id="category" className='px-3 text-gray-800  border border-gray-600/40' value={data.category_id} onChange={handleChange}>

                  {categories.map((category, index) => (
                    <option value={category.id} key={index}>{category.nom}</option>
                  ))}

                </select>
              </div>
              <div className=' flex flex-col space-y-2  mb-3'>
                <label htmlFor="annee" className='text-gray-600 font-medium text-md'>Année </label>
                <input type="number" id="annee" name='annee' className='py-2  px-3 text-gray-800  border border-gray-600/40' value={data.annee} onChange={handleChange} />
              </div>
              <div className=' flex flex-col space-y-2  mb-3'>
                <label htmlFor="price" className='text-gray-600 font-medium text-md'>Prix </label>
                <input type="text" name='price' id="price" className='py-2  px-3 text-gray-800  border border-gray-600/40' value={data.price} onChange={handleChange} />
              </div>

            </div>
            <div className='bg-gray-100 flex items-center justify-around space-x-8 py-5   px-8'>
              <button className='bg-gray-600 hover:bg-gray-500 text-white rounded-md px-3 py-2 hover:cursor-pointer' onClick={() => setShowModalEdit(false)}> Annuler</button>
              <button className='bg-green-600 hover:bg-green-500 text-white rounded-md px-3 py-2 hover:cursor-pointer' onClick={handleEdit}> Modifier</button>
            </div>
          </div>
        </div>

      )}
    </>
  );
}