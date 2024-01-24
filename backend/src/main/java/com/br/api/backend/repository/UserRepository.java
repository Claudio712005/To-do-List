package com.br.api.backend.repository;

import org.springframework.data.repository.CrudRepository;
import com.br.api.backend.model.UserModel;
import java.util.List;


public interface UserRepository extends CrudRepository<UserModel, Long> {

    
    
    List<UserModel> findByEmailAndPassword(String email, String password);

}
