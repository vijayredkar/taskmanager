package com.todoservice.domainobject;

import java.time.ZonedDateTime;
import javax.persistence.Column;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;
import javax.validation.constraints.NotNull;
import org.springframework.format.annotation.DateTimeFormat;

@Entity
@Table(
    name = "task",
    uniqueConstraints = @UniqueConstraint(name = "uc_name", columnNames = {"name"})
)
public class TaskDO
{

    @Id
    @GeneratedValue
    private Long id;
        
    @Column(nullable = false)
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    private ZonedDateTime dateCreated = ZonedDateTime.now();
    
    @Column(nullable = false)
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    private ZonedDateTime dateUpdated = ZonedDateTime.now();

    @Column(nullable = false)
    @NotNull(message = "Task name cannot be null!")
    private String name;

    private String desc;
    
    @Column(nullable = false)
    @NotNull(message = "Status cannot be null!")
    private String status;

    private TaskDO()
    {
    }

    //id, date_created, date_updated, name, desc, status
    public TaskDO(String name, String desc, String status, ZonedDateTime dateCreated,  ZonedDateTime dateUpdated)
    {
        this.name = name;
        this.desc = desc;
        this.status = status;
        this.dateCreated = dateCreated;
        this.dateUpdated = dateUpdated;
    }

	/**
	 * @return the id
	 */
	public Long getId() {
		return id;
	}

	/**
	 * @param id the id to set
	 */
	public void setId(Long id) {
		this.id = id;
	}

	/**
	 * @return the dateCreated
	 */
	public ZonedDateTime getDateCreated() {
		return dateCreated;
	}

	/**
	 * @param dateCreated the dateCreated to set
	 */
	public void setDateCreated(ZonedDateTime dateCreated) {
		this.dateCreated = dateCreated;
	}

	/**
	 * @return the dateUpdated
	 */
	public ZonedDateTime getDateUpdated() {
		return dateUpdated;
	}

	/**
	 * @param dateUpdated the dateUpdated to set
	 */
	public void setDateUpdated(ZonedDateTime dateUpdated) {
		this.dateUpdated = dateUpdated;
	}

	/**
	 * @return the name
	 */
	public String getName() {
		return name;
	}

	/**
	 * @param name the name to set
	 */
	public void setName(String name) {
		this.name = name;
	}

	/**
	 * @return the desc
	 */
	public String getDesc() {
		return desc;
	}

	/**
	 * @param desc the desc to set
	 */
	public void setDesc(String desc) {
		this.desc = desc;
	}

	/**
	 * @return the status
	 */
	public String getStatus() {
		return status;
	}

	/**
	 * @param status the status to set
	 */
	public void setStatus(String status) {
		this.status = status;
	}
}
