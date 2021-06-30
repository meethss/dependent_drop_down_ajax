from django.shortcuts import render, redirect
from .models import *
from .forms import *
import json
from django.http import HttpResponse
from django.core import serializers

# Create your views here.

def Home(request):
    return render(request, 'blog/nav.html')

def index(request):
    if request.GET and request.is_ajax():    
        members = Member.objects.filter(firstname=request.GET['mname'])
        json_models = serializers.serialize("json", members)
        print(json_models)
        return HttpResponse(json_models)

    members = Member.objects.all()
    # new_member = CreateMember()
    return render(request, 'blog/index.html', {'members': members})

def insert(request):
    member = Member(firstname=request.POST['firstname'], lastname=request.POST['lastname'], address=request.POST['address'])
    member.save()
    return redirect('index')

def newBranch(request):
    branch = Branch.objects.all()
    return render(request, 'blog/new_branch.html', {'members': branch})

def insertBranch(request):
    branch = Branch(name = request.POST['name'])
    branch.save()
    return redirect('branch')

def newSubject(request):
    branch = Branch.objects.all()
    subject = Subjects.objects.all()
    return render(request, 'blog/new_subjects.html', {'members': subject, 'branchs':branch})

def insertSubject(request):
    branch = Subjects(name = request.POST['name'], branch=Branch.objects.get(id=request.POST['bname']))
    branch.save()
    return redirect('subject')

def fetchSubject(request):
    if request.GET and request.is_ajax():    
        subjects = Subjects.objects.filter(branch=request.GET['bname'])
        json_models = serializers.serialize("json", subjects)
        print(json_models)
        return HttpResponse(json_models)

    branch = Branch.objects.all()
    sems = Semester.objects.all()
    # subject = Subjects.objects.all()
    return render(request, 'blog/students.html', {'branchs':branch,'sems':sems})

def fetchstudent(request):
    if request.GET and request.is_ajax():    
        students = Student.objects.filter(branch=Branch.objects.get(id= request.GET['bname']),semester=Semester.objects.get(id=request.GET['sname']))
        json_models = serializers.serialize("json", students)
        print(json_models)
        return HttpResponse(json_models)

def newSemester(request):
    print("+++++++++++++")
    if request.POST:
        print("------------")
        newsem = CreateSemester(request.POST)
        if newsem.is_valid():
            newsem.save()
            redirect('newSemester')

    context = {'newsem':CreateSemester(), 'members':Semester.objects.all()}
    return render(request, 'blog/new_semester.html',context)