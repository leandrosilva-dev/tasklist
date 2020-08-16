package org.example.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Entity
public class Task implements Serializable {
    @Id
    @GeneratedValue
    private Integer taskId;
    private String titulo;
    private String status;
    private String descricao;
    @Temporal(TemporalType.TIMESTAMP)
    private Date dataCriacao;
    @Temporal(TemporalType.TIMESTAMP)
    private Date dataEdicao;
    @Temporal(TemporalType.TIMESTAMP)
    private Date dataExclusao;
    @Temporal(TemporalType.TIMESTAMP)
    private Date dataConclusao;

    public Task(){

    }

    @JsonProperty("task_id")
    public Integer getTaskId() {
        return taskId;
    }

    public void setTaskId(Integer taskId) {
        this.taskId = taskId;
    }

    @JsonProperty("titulo")
    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    @JsonProperty("status")
    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    @JsonProperty("descricao")
    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    @JsonProperty("data_criacao")
    public Date getDataCriacao() {
        return dataCriacao;
    }

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    public void setDataCriacao(Date dataCriacao) {
        this.dataCriacao = dataCriacao;
    }

    @JsonProperty("data_edicao")
    public Date getDataEdicao() {
        return dataEdicao;
    }

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    public void setDataEdicao(Date dataEdicao) {
        this.dataEdicao = dataEdicao;
    }

    @JsonProperty("data_exclusao")
    public Date getDataExclusao() {
        return dataExclusao;
    }

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    public void setDataExclusao(Date dataExclusao) {
        this.dataExclusao = dataExclusao;
    }

    @JsonProperty("data_conclusao")
    public Date getDataConclusao() {
        return dataConclusao;
    }

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    public void setDataConclusao(Date dataConclusao) {
        this.dataConclusao = dataConclusao;
    }
}
