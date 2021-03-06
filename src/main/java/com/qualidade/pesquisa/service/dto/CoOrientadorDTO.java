package com.qualidade.pesquisa.service.dto;


import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the CoOrientador entity.
 */
public class CoOrientadorDTO implements Serializable {

    private Long id;

    private Long alunoId;

    private Long professorId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getAlunoId() {
        return alunoId;
    }

    public void setAlunoId(Long alunoId) {
        this.alunoId = alunoId;
    }

    public Long getProfessorId() {
        return professorId;
    }

    public void setProfessorId(Long professorId) {
        this.professorId = professorId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        CoOrientadorDTO coOrientadorDTO = (CoOrientadorDTO) o;
        if(coOrientadorDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), coOrientadorDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CoOrientadorDTO{" +
            "id=" + getId() +
            "}";
    }
}
