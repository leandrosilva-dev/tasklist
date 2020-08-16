package org.example.persistence;

import org.example.model.Task;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.persistence.TypedQuery;
import java.util.List;

@Repository
public class TaskPersistence {

    @PersistenceContext
    private EntityManager entityManager;

    @Transactional
    public void insert(Task task){
        this.entityManager.persist(task);
    }

    @Transactional
    public void update(Task task){
        this.entityManager.merge(task);
    }

    @Transactional
    public void delete(Integer taskId){
        Query query = this.entityManager.createQuery("delete from Task c where c.taskId = :task_id");
        int deletedCount = query.setParameter("task_id", taskId).executeUpdate();
    }

    public List<Task> getAll(){
        TypedQuery<Task> query = this.entityManager.createQuery("SELECT c FROM Task c", Task.class);
        List<Task> results = query.getResultList();

        return results;
    }
}
