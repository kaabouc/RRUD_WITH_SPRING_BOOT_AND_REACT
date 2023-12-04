import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateProduct = () => {
  const { id } = useParams();
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [telephone, setTelephone] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:8081/produit/get/${id}`);
        const product = await response.json();
        setNom(product.nom);
        setPrenom(product.prenom);
        setTelephone(product.telephone);
      } catch (error) {
        console.error('Error fetching product', error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleSubmit = async () => {
    try {
      // Vérifier si le champ "Nom" est vide
      if (!nom) {
        setError('Le champ "Nom" est obligatoire.');
        return;
      }

      const updatedProduct = {
        nom,
        prenom,
        telephone,
      };

      const response = await fetch(`http://localhost:8081/produit/update/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProduct),
      });

      if (response.ok) {
        navigate('/'); // Rediriger vers la liste des produits après la mise à jour
      } else {
        // Gérer les erreurs de l'API
        console.error('Error updating product:', response.statusText);
        // Afficher un message d'erreur à l'utilisateur si nécessaire
      }
    } catch (error) {
      // Gérer les erreurs liées à la requête ou à d'autres problèmes
      console.error('Error updating product', error);
      // Afficher un message d'erreur à l'utilisateur si nécessaire
    }
  };

  return (
    <div>
      <h2>Modifier le Produit</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="mb-3">
        <label htmlFor="nom">Nom:</label>
        <input
          type="text"
          id="nom"
          name="nom"
          className="form-control"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="prenom">Prenom:</label>
        <input
          type="text"
          id="prenom"
          name="prenom"
          className="form-control"
          value={prenom}
          onChange={(e) => setPrenom(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="telephone">Telephone:</label>
        <input
          type="text"
          id="telephone"
          name="telephone"
          className="form-control"
          value={telephone}
          onChange={(e) => setTelephone(e.target.value)}
        />
      </div>
      <button
        type="button"
        className="btn btn-primary"
        onClick={handleSubmit}
      >
        Enregistrer
      </button>
    </div>
  );
};

export default UpdateProduct;
