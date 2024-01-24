package com.br.api.backend.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.br.api.backend.model.TaskModel;
import com.br.api.backend.model.UserModel;
import com.br.api.backend.repository.TaskRepository;
import com.br.api.backend.repository.UserRepository;

@Service
public class TaskService {
    
    @Autowired
    private TaskRepository tr;

    @Autowired
    private UserRepository ur;

    // Cadastrar tarefa
    public ResponseEntity<?> createTask(TaskModel tm, long userId){
        Optional<UserModel> userOptional = ur.findById(userId);

        if (userOptional.isPresent()) {
            UserModel user = userOptional.get();        
            tm.setUser(user);
            TaskModel savedTask = tr.save(tm);
            return new ResponseEntity<>(savedTask, HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>("Usuário não encontrado", HttpStatus.NOT_FOUND);
        }
    }

    // Deletar tarefa
    public ResponseEntity<?> deleteTask(int idTask){
        if(tr.existsById(idTask)){  
            TaskModel obj = tr.findById(idTask).orElse(null);
            if (obj != null) {
                tr.delete(obj);
                String message = "Tarefa removida com sucesso";
                return new ResponseEntity<>(message, HttpStatus.OK);
            } else {
                String message = "Erro ao recuperar a tarefa";
                return new ResponseEntity<>(message, HttpStatus.INTERNAL_SERVER_ERROR);
            }
        } else{
            String mesage = "Task não encontrada";
            return new ResponseEntity<>(mesage, HttpStatus.BAD_REQUEST);
        }
    }

    // Editar tarefa
    public ResponseEntity<?> editTask(TaskModel tm){
        if(!tr.existsById(tm.getIdTask())){
            String mesage = ("O código informado não existe.");
            return new ResponseEntity<>(mesage, HttpStatus.NOT_FOUND);
        } else if(tm.getNameTask().equals("")){
            String mesage=("É necessário informar um nome");
            return new ResponseEntity<>(mesage, HttpStatus.BAD_REQUEST);
        } else if(tm.getDescriptionTask().equals("")){
            String mesage=("Informe uma idade válida");
            return new ResponseEntity<>(mesage, HttpStatus.BAD_REQUEST);
        } else{
            return new ResponseEntity<>(tr.save(tm), HttpStatus.OK);
        }
    }
}
