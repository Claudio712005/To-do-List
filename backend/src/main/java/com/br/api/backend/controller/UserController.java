package com.br.api.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import com.br.api.autentication.UserAutentication;
import com.br.api.backend.model.UserModel;
import com.br.api.backend.service.UserService;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private UserService us;
    
    @PostMapping("/createUser")
    public ResponseEntity<?> createUser(@RequestBody UserModel um) {
        return us.create(um);
    }

    @PostMapping("/autenticate")
    public ResponseEntity<?> autenticator(@RequestBody UserAutentication request) {
        return us.autenticate(request.getEmail(), request.getPassword());
    }
    
}
