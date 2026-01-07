from django.urls import path
from .views import AttendanceViaCodeView, AttendanceSessionView, AttendanceView

urlpatterns = [
    path("", AttendanceView.as_view()),
    path("session/", AttendanceSessionView.as_view()),
    path("session/<session_id>/", AttendanceSessionView.as_view()),
    path("session/code/", AttendanceViaCodeView.as_view()),
]
