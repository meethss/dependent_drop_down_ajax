from django.db import models

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


class Subjects(models.Model):
    name = models.CharField(max_length=50)
    branch = models.ForeignKey(Branch, null=True,on_delete = models.SET_NULL)

    def __str__(self):
        return self.name