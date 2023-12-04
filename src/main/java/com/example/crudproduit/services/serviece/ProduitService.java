package com.example.crudproduit.services.serviece;

import com.example.crudproduit.domaine.Produit;
import org.springframework.stereotype.Service;

import java.util.List;


public interface ProduitService {

     Produit saveProduit(Produit p);
     List<Produit> getlistProduit();
     Produit updateProduit(Long produitId, Produit updatedProduit);
      void deleteProduitById(Long id);
      Produit getProduitById( Long id);
   List<Produit> findByNomContaining(String nom);


}
