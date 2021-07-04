from django.urls import path
from . import views

urlpatterns = [
    # path("",views.Home,name="home"),
    path("", views.index, name='index'),
    path("insert", views.insert, name='insert'),
    path("newbranch",views.newBranch, name='branch'),
    path("insertbranch",views.insertBranch, name='insertbranch'),
    path("newsubject",views.newSubject, name='subject'),
    path("insertsubject",views.insertSubject, name='insertsubject'),
    path("fetchsubject",views.fetchSubject, name='fetchsubject'),
    path("newSemester",views.newSemester, name='newSemester'),
    path("fetchstudent",views.fetchstudent, name='fetchstudent'),
    path("mark",views.MarkAtt, name='mark'),
    path("editattendance",views.editAttendance, name='editattendance'),
    path("Updateattendance",views.UpdateAttendance, name='Updateattendance'),

# 
]