package com.br.api.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.br.api.backend.model.UserModel;
import com.br.api.backend.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository ur;
    
    public ResponseEntity<?> create(UserModel um){
        return new ResponseEntity<UserModel>(ur.save(um), HttpStatus.CREATED);
    }

    public ResponseEntity<?> autenticate(String email, String password){
        if(email.equals("") || password.equals("")){
            String mesage = "Campo vazio";
            return new ResponseEntity<>(mesage, HttpStatus.BAD_REQUEST);
        } else{
            List<UserModel> returnDataValidation = ur.findByEmailAndPassword(email, password);

            if(returnDataValidation.size() <= 0){
                String mesage = "Nenhum usuário encontrado";
                return new ResponseEntity<>(mesage, HttpStatus.NOT_FOUND);
            } else{
                return new ResponseEntity<>(ur.findByEmailAndPassword(email, password), HttpStatus.OK);
            }
        }
    }
}
