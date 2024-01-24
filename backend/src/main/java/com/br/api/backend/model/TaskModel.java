package com.br.api.backend.model;

import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "task")
@Getter
@Setter
public class TaskModel {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idTask;

    private String nameTask;

    private String descriptionTask;

    @Temporal(TemporalType.DATE)
    private Date taskDate;

    @ManyToOne
    @JoinColumn(name = "fkUser")
    private UserModel user;
}
