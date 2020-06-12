@echo off

call heroku container:push web -a dotnetify-mfe
call heroku container:release web -a dotnetify-mfe

