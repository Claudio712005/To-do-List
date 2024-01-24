package com.br.api.backend.repository;

import org.springframework.data.repository.CrudRepository;
import com.br.api.backend.model.UserModel;
import java.util.List;
import java.util.Optional;

public interface UserRepository extends CrudRepository<UserModel, Integer> {

    List<UserModel> findByEmailAndPassword(String email, String password);

    Optional<UserModel> findById(int userId);
}

