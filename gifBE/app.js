const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
app.use(cors());
app.options('*', cors());
//db connnection

mongoose.connect('mongodb://localhost/Gifdb' , {useNewUrlParser:true , useFindAndModify: false});
const con = mongoose.connection

//test connection
con.on('open',() =>{

  console.log('connected to the database')
})

app.listen(9000, () => {

  console.log('Server started on port 9000')
})




app.use(express.json())
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'DELETE, PUT');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


const UserRouter = require('./routes/users')
app.use('/users',UserRouter)


// const ParentRouter = require('./routes/parents')
// app.use('/parents',ParentRouter)


// const TeacherRouter = require('./routes/teachers')
// app.use('/teachers',TeacherRouter)


// const AdminRouter = require('./routes/admins')
// app.use('/admins',AdminRouter)


// const CourseRouter = require('./routes/courses')
// app.use('/courses' , CourseRouter)


// const LeaveRequestRouter = require('./routes/leaveRequests')
// app.use('/leaveRequests' , LeaveRequestRouter)


// const CourseAnnouncementRouter = require('./routes/courseAnnouncements')
// app.use('/courseAnnouncements' , CourseAnnouncementRouter)


// const CourseAttedanceRouter = require('./routes/courseAttedances')
// app.use('/courseAttedances' , CourseAttedanceRouter)


// const StudentCourseWorkRouter = require('./routes/studentCourseWorks')
// app.use('/studentCourseWorks' , StudentCourseWorkRouter)


// const LoginRouter = require('./routes/login')
// app.use('/login' , LoginRouter)


// const SchoolAnnouncementRouter = require('./routes/schoolAnnouncements')
// app.use('/schoolAnnouncements' , SchoolAnnouncementRouter)


// const ScheduleRouter = require('./routes/schedules')
// app.use('/schedules' , ScheduleRouter)
