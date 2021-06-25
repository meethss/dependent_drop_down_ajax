
from django import forms
from django.forms import ModelForm
from .models import *

class CreateMember(ModelForm):
	class Meta:
		model = Member
		fields = '__all__'

class CreateBranch(ModelForm):
    class Meta:
        models = Branch
        fields = '__all__'

class CreateSubject(ModelForm):
    class Meta:
        models = Subjects
        fields = '__all__'

