package com.br.api.backend.service;

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
}
