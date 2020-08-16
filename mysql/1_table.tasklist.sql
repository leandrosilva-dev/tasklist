create table if not exists task(
    task_id        integer auto_increment not null primary key
   ,status         varchar(200) not null
   ,descricao      text not null
   ,data_criacao   datetime not null
   ,data_edicao    datetime
   ,data_exclusao  datetime
   ,data_conclusao datetime
);
