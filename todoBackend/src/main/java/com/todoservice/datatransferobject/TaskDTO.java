package com.todoservice.datatransferobject;

import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class TaskDTO
{
	
	@JsonIgnore
    private Long id;

    @NotNull(message = "Task name cannot be null!")
    private String name;

    @NotNull(message = "Description cannot be null!")
    private String desc;

    
    @NotNull(message = "Status cannot be null!")
    private String status;
    
    private TaskDTO()
    {
    }


    private TaskDTO(Long id, String name, String desc, String status)
    {
        this.id = id;
        this.name = name;
        this.desc = desc;
        this.status = status;
    }


    public static TaskDTOBuilder newBuilder()
    {
        return new TaskDTOBuilder();
    }


    @JsonProperty
    public Long getId()
    {
        return id;
    }


    public String getName()
    {
        return name;
    }


    public String getStatus()
    {
        return status;
    }


    public String getDesc()
    {
        return desc;
    }    
    
    public static class TaskDTOBuilder
    {
        private Long id;
        private String name;
        private String desc;
        private String status;


        public TaskDTOBuilder setId(Long id)
        {
            this.id = id;
            return this;
        }


        public TaskDTOBuilder setName(String name)
        {
            this.name = name;
            return this;
        }


        public TaskDTOBuilder setDesc(String desc)
        {
            this.desc = desc;
            return this;
        }


        public TaskDTOBuilder setStatus(String status)
        {
            this.status = status;
            return this;
        }


        public TaskDTO createTaskDTO()
        {
            return new TaskDTO(id, name, desc, status);
        }
    }
}