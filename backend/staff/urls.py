from django.urls import path
from .views import GetUserView, AttendanceSessionView

urlpatterns = [
    path("users/", GetUserView.as_view()),
    path("sessions/", AttendanceSessionView.as_view()),
]
