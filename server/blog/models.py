from django.db import models
import datetime

# Create your models here.
class Member(models.Model):
    firstname = models.CharField(max_length=50, null=False, blank=False)
    lastname = models.CharField(max_length=50)
    address = models.CharField(max_length=50)

    def __str__(self):
        return self.firstname + " " + self.lastname


class Branch(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name

class Semester(models.Model):
    name = models.CharField(max_length=100, null=True, blank=True)
    
    def __str__(self):
        return self.name

class Subjects(models.Model):
    name = models.CharField(max_length=50)
    branch = models.ForeignKey(Branch, null=True,on_delete = models.SET_NULL)

    def __str__(self):
        return self.name

class Student(models.Model):
    name = models.CharField(blank=True, null=True, max_length=255)
    enrolment = models.CharField(default=None,blank=True, null=True, max_length=255)
    dob = models.DateTimeField()
    branch = models.ForeignKey(Branch, on_delete = models.SET_NULL, null=True)
    semester = models.ForeignKey(Semester, on_delete = models.SET_NULL, null=True)

    def __str__(self):
        return self.name + " " + str(self.branch)+" "+str(self.semester)

class Attendance(models.Model):
    student_id = models.ForeignKey(Student, on_delete=models.SET_NULL, null=True)
    branch_id = models.ForeignKey(Branch,on_delete=models.SET_NULL, null=True)
    sub_id = models.ForeignKey(Subjects, on_delete=models.SET_NULL, null=True)
    sem_id = models.ForeignKey(Semester, on_delete=models.SET_NULL, null=True)
    status = models.CharField(blank=True, null=True, max_length=30)
    date = models.DateField()