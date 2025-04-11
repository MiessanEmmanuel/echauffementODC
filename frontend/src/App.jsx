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
  }, [])



  return (
    <>
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

    </>
  )
}


const OrdinateurRow = ({ ordinateur }) => {

  const [showModalDelete, setShowModalDelete] = useState(false)
  const [showModalEdit, setShowModalEdit] = useState(false)


  const handleDelete = async () => {
    try {
      const response = await axios.delete(`http://127.0.0.1:8000/api/ordinateurs/${ordinateur.id}`);
      const data = await response.data;
      console.log('suppresion effectué')
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'ordinateur :', error);
    }
  };

  return (
    <>
      <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">

        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white uppercase">
          {ordinateur.nom}
        </th>
        <td class="px-6 py-4">
          {ordinateur.sizeScreen}

        </td>
        <td class="px-6 py-4">
          {ordinateur.category.nom}
        </td>
        <td class="px-6 py-4">
          $2999
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
              Voulez-vous supprimer cet Ordinateur ?
            </div>
            <div className='bg-gray-100 flex items-center justify-around space-x-8 py-5   px-8'>
              <button className='bg-gray-600 hover:bg-gray-500 text-white rounded-md px-3 py-2 hover:cursor-pointer' onClick={() => setShowModalDelete(false)}> Annuler</button>
              <button className='bg-red-600 hover:bg-red-500 text-white rounded-md px-3 py-2 hover:cursor-pointer' onClick={handleDelete}> Supprimer</button>

            </div>
          </div>
        </div>

      )}
    </>
  );
}