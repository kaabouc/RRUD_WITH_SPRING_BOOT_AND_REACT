import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Charger la liste des produits depuis le backend lors du montage du composant
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:8081/produit/all');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products', error);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (productId) => {
    try {
      // Envoyer une requête DELETE pour supprimer le produit
      await fetch(`http://localhost:8081/produit/delete/${productId}`, {
        method: 'DELETE',
      });

      // Actualiser la liste des produits après la suppression
      setProducts(products.filter(product => product.id !== productId));
    } catch (error) {
      console.error('Error deleting product', error);
    }
  };

  return (
    <div>
      <h2>Liste des Produits</h2>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom</th>
            <th>prenom </th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.nom}</td>
              <td>{product.prenom}</td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(product.id)}
                >
                  Supprimer
                </button>
                {/* Ajouter un lien vers la page de modification */}
                <Link to={`/update/${product.id}`} className="btn btn-primary ms-2">
                    Modifier
                  </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
