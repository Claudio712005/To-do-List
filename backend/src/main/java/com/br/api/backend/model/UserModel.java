package com.br.api.backend.model;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Table;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "user")
@Getter
@Setter
public class UserModel {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long Id;

    private String name;

    private String email;  

    private String passworld;
}
