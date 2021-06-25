
from django.urls import path, include
from django.contrib import admin
from . import views

urlpatterns = [
    # path("", views.index_redirect, name='index_redirect'),
    path("", include('blog.urls')),
    path("admin/", admin.site.urls),
]
