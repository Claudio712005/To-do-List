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
    public ResponseEntity<?> createTask(TaskModel tm, int userId){
        Optional<UserModel> userOptional = ur.findById(userId);
        if (userOptional.isPresent()) {
            UserModel user = userOptional.get();        
            tm.setUser(user);
            return new ResponseEntity<>(tr.save(tm), HttpStatus.CREATED);
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

    // Acha as tarefas do usuário
    public ResponseEntity<?> findTaskByIdUser(int userId){
        if(userId <= 0){
            String mesage = "Incorrect id user.";
            return new ResponseEntity<>(mesage, HttpStatus.BAD_REQUEST);
        } else if(!ur.existsById(userId)){
            String mesage = "Not found user.";
            return new ResponseEntity<>(mesage, HttpStatus.NOT_FOUND);
        } else{
            return new ResponseEntity<>(tr.findByUser_Id(userId), HttpStatus.OK);
        }
    }

    // Exibe uma tarefa específica
    public ResponseEntity<?> showTask(int idTask){
        if(idTask <= 0){
            String mesage = "Incorrect id Task.";
            return new ResponseEntity<>(mesage, HttpStatus.BAD_REQUEST);
        } else if(!tr.existsById(idTask)){
            String mesage = "Not found task.";
            return new ResponseEntity<>(mesage, HttpStatus.NOT_FOUND);
        } else{
            return new ResponseEntity<>(tr.findByIdTask(idTask), HttpStatus.OK);
        }
    }

    public ResponseEntity<?> findTaskNotDone(boolean st, int id){
        return new ResponseEntity<>(tr.findByDoneAndUser_id(st, id), HttpStatus.OK);
    }

    public ResponseEntity<?> findTaskOrderedByDescPriority(int id){
        return new ResponseEntity<>(tr.findByUser_idOrderByPriorityDesc(id), HttpStatus.OK);
    }
    
}
