var mongoose = require( 'mongoose' ); 


/*
สร้าง Admin user
- mongo
- show dbs
- use admin
- db.createUser ( { user: 'root', pwd: '12345678', roles: [ { role: 'root', db: 'admin' } ] } )

สร้าง user อื่นๆ (ในที่นี้ให้ access database ชื่อ cmpos)
- use admin
- db.createUser ( { user: 'admin', pwd: '12345678', roles: [ { 'role' : 'readWrite', 'db' : 'cmpos' }, { 'role' : 'clusterAdmin', 'db' : 'admin' } ] } )
Enable Authorization
- sudo vi /etc/mongod.conf
แก้ไขข้อความ ดังนี้ แล้วบันทึก
security:
    authorization: enabled

    - for linux: sudo systemctl restart mongod.service
    - for macOS: sudo mongod --auth --port 27017 --dbpath /data/db 
ต้องการ จากนั้นแก้ไขใน mongod.conf
*/


mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
mongoose.connect(`mongodb://admin:12345678@127.0.0.1:27017/cmpos?authSource=admin`, {useNewUrlParser: true});
//mongoose.connect('mongodb://127.0.0.1/cmpos', {useNewUrlParser: true}) 

mongoose.connection.on('connected', function () {  
  console.log('Mongoose default connection open');
}); 

mongoose.connection.on('error',function (err) {  
  console.log('Mongoose default connection error: ' + err);
}); 

mongoose.connection.on('disconnected', function () {  
  console.log('Mongoose default connection disconnected'); 
});

process.on('SIGINT', function() {  
  mongoose.connection.close(function () { 
    console.log('Mongoose default connection disconnected through app termination'); 
    process.exit(0); 
  }); 
}); 
