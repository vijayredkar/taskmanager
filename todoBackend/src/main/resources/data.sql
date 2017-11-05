/**
 * CREATE Script for init of DB
 */

-- Create initial tasks

insert into task (id, date_created, date_updated, name, desc, status) 
values (1, now(), now(), 'Investment', 'Plan for MF', 'started');

insert into task (id, date_created, date_updated, name, desc, status) 
values (2, now(), now(), 'Health', 'Plan for Insurance', 'pending');

insert into task (id, date_created, date_updated, name, desc, status) 
values (3, now(), now(), 'Education', 'Plan for higher studies', 'onhold');

insert into task (id, date_created, date_updated, name, desc, status) 
values (4, now(), now(), 'Holiday', 'Plan for long trip', 'discarded');

insert into task (id, date_created, date_updated, name, desc, status) 
values (5, now(), now(), 'Entertainment', 'Plan for party', 'completed');