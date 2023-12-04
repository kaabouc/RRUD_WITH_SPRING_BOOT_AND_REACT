package com.example.crudproduit.services.implementServices;

import com.example.crudproduit.domaine.Produit;
import com.example.crudproduit.repositories.Produitrepositories;
import com.example.crudproduit.services.serviece.ProduitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class ImplementProduitService implements ProduitService {
    @Autowired
    Produitrepositories produitrepositories;
    @Override
    public Produit saveProduit(Produit p) {
        return  produitrepositories.save(p);
    }

    @Override
    public List<Produit> getlistProduit() {
        return produitrepositories.findAll() ;
    }
    @Override
    public List<Produit> findByNomContaining(String nom) {
        return produitrepositories.findByNomContaining(nom);
    }

    @Override
    public Produit updateProduit(Long produitId, Produit updatedProduit) {
        Produit existingProduit = produitrepositories.findById(produitId)
                .orElseThrow(() -> new RuntimeException("Produit non trouvé avec l'ID : " + produitId));

        // Mettre à jour les propriétés du produit existant
        existingProduit.setNom(updatedProduit.getNom());
        existingProduit.setPrenom(updatedProduit.getPrenom());
        existingProduit.setTelephone(updatedProduit.getTelephone());

        // Enregistrer le produit mis à jour dans la base de données
        return produitrepositories.save(existingProduit);
    }

    @Override
    public void deleteProduitById(Long id) {
        produitrepositories.deleteById(id);
    }

    @Override
    public Produit getProduitById(Long id) {
        return produitrepositories.findById(id).get();
    }
}
