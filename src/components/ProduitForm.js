import React, { useState, useEffect } from 'react';
import ApiService from '../services/ApiService.js';

const ProductForm = ({ product, onCancelEdit }) => {
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [telephone, setTelephone] = useState('');

  // Mettre à jour les champs lorsque le produit change
  useEffect(() => {
    setNom(product ? product.nom : '');
    setPrenom(product ? product.prenom : '');
    setTelephone(product ? product.telephone : '');
  }, [product]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newProduct = {
      nom,
      prenom,
      telephone,
    };

    // Envoyer la requête POST pour créer un nouveau produit
    try {
      if (product) {
        // S'il s'agit d'une modification, envoyer une requête PUT
        await ApiService.updateProduct(product.id, newProduct);
      } else {
        // Sinon, envoyer une requête POST
        await ApiService.createProduct(newProduct);
      }
      // Actualiser la liste des produits après l'ajout ou la modification
      // Vous pouvez utiliser une fonction de rappel ou un autre moyen pour actualiser la liste dans ProductList
      onCancelEdit();
    } catch (error) {
      console.error('Error creating/updating product', error);
    }
  };

  return (
    <div>
      <h2>{product ? 'Modifier' : 'Ajouter'} un Produit</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="nom" className="form-label">
            Nom :
          </label>
          <input
            type="text"
            className="form-control"
            id="nom"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="prenom" className="form-label">
            Prénom :
          </label>
          <input
            type="text"
            className="form-control"
            id="prenom"
            value={prenom}
            onChange={(e) => setPrenom(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="telephone" className="form-label">
            Téléphone :
          </label>
          <input
            type="tel"
            className="form-control"
            id="telephone"
            value={telephone}
            onChange={(e) => setTelephone(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-success">
          {product ? 'Enregistrer' : 'Ajouter'}
        </button>
        <button
          type="button"
          className="btn btn-secondary ms-2"
          onClick={onCancelEdit}
        >
          Annuler
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
