package com.example.crudproduit.controllers;

import com.example.crudproduit.domaine.Produit;
import com.example.crudproduit.services.serviece.ProduitService;
import org.hibernate.annotations.Parameter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@CrossOrigin
@RequestMapping("/produit")
public class ProduitController {
    @Autowired
    ProduitService produitService;

    @PostMapping("/save")
   public Produit saveProduits(@RequestBody Produit p){
       return  produitService.saveProduit(p);
   }

   @GetMapping("/all")
   public List<Produit> getListOfProduit(){
        return  produitService.getlistProduit();
   }
    @PutMapping("/update/{produitId}")
    public Produit updateProduit(@PathVariable Long produitId, @RequestBody Produit updatedProduit) {
        return produitService.updateProduit(produitId, updatedProduit);
    }
    @DeleteMapping("/delete/{id}")
    public void deleteProduit(@PathVariable Long id){
        produitService.deleteProduitById(id);
    }

    @GetMapping("/get/{id}")
    public  Produit getProduit(@PathVariable Long id){
        return  produitService.getProduitById(id);
    }
    @GetMapping("/search")
    public List<Produit> searchProduitsByName(@RequestParam String nom) {
        return produitService.findByNomContaining(nom);
    }
}
