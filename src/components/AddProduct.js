import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const AddProduct = () => {
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [telephone, setTelephone] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate()
  const handleSubmit = async () => {
    try {
      // Envoyer les données au backend pour l'ajout du produit
      const response = await fetch('http://localhost:8081/produit/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nom, prenom, telephone }),
      });

      if (response.ok) {
        // Si l'ajout est réussi, afficher l'alerte
        setShowAlert(true);
        navigate('/');
      } else {
        // Gérer les erreurs de l'API
        console.error('Error adding product:', response.statusText);
        // Afficher un message d'erreur à l'utilisateur si nécessaire
      }
    } catch (error) {
      // Gérer les erreurs liées à la requête ou à d'autres problèmes
      console.error('Error adding product', error);
      // Afficher un message d'erreur à l'utilisateur si nécessaire
    }
  };

  return (
    <div>
      <h2>Ajouter un Produit</h2>
      <div className="mb-3">
        <label htmlFor="nom">Nom:</label>
        <input
          type="text"
          id="nom"
          name="nom"
          className="form-control"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
       required />
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
        className="btn btn-success"
        onClick={handleSubmit}
      >
        Ajouter
      </button>

      {showAlert && (
        <div className="alert alert-success mt-3" role="alert">
          Produit ajouté avec succès!
          <button
            type="button"
            className="btn-close"
            aria-label="Fermer"
            onClick={() => setShowAlert(false)}
          ></button>
        </div>
      )}
    </div>
  );
};

export default AddProduct;
