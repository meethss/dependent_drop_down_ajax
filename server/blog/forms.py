
from django import forms
from django.forms import ModelForm
from .models import *

class CreateMember(ModelForm):
	class Meta:
		model = Member
		fields = '__all__'

class CreateBranch(ModelForm):
    class Meta:
        model = Branch
        fields = '__all__'

class CreateSubject(ModelForm):
    class Meta:
        model = Subjects
        fields = '__all__'

class CreateSemester(ModelForm):
    class Meta:
        model = Semester
        fields = '__all__'

class CreateStudent(ModelForm):
    class Meta:
        model = Student
        fields = '__all__'