Create REST API using node, mongodb as the database.

Download the project in C:

c:\profile-rest-api>npm install
npm WARN nodejs-creating-restful-apis@1.0.0 No repository field.
npm WARN optional SKIPPING OPTIONAL DEPENDENCY: fsevents@1.2.9 (node_modules\fsevents):
npm WARN notsup SKIPPING OPTIONAL DEPENDENCY: Unsupported platform for fsevents@1.2.9: wanted {"os":"darwin","arch":"any"} (current: {"os":"win32","arch":"x64"})

audited 2441 packages in 4.758s
found 5 vulnerabilities (1 low, 1 moderate, 3 high)
  run `npm audit fix` to fix them, or `npm audit` for details
  
  
  
c:\profile-rest-api>npm start

> nodejs-creating-restful-apis@1.0.0 start c:\for_github\profile-rest-api
> node server.js

Express server listening on port 3001

Postman can be used to test the API:

http://localhost:3001/profiles

http://localhost:3001/profiles/findByPagination?skip=5&limit=5

Screenshot attached.