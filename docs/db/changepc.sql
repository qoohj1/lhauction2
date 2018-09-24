delimiter $$
create procedure test_while()
begin
declare lots int default 2001;
declare ids int default 897;
while ids<1055 do
    update curio_pic_content set num = lots where id = ids;
    select lots;
    select ids;
    set ids=ids+1;
    set lots=lots+1;
end while;
end $$
delimiter ;
