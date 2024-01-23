package com.br.api.backend.repository;

import org.springframework.data.repository.CrudRepository;

import com.br.api.backend.model.UserModel;

public interface UserRepository extends CrudRepository<UserModel, Long> {
    
}
