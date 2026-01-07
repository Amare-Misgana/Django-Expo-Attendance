from django.urls import path
from .views import (
    AttendanceViaCodeView,
    AttendanceSessionView,
    AttendanceView,
    EndAttendanceSession,
)

urlpatterns = [
    path("", AttendanceView.as_view()),
    path("session/", AttendanceSessionView.as_view()),
    path("session/<int:session_id>/", AttendanceSessionView.as_view()),
    path("session/delete/<int:session_id>/", AttendanceSessionView.as_view()),
    path("attendance/recored/code/", AttendanceViaCodeView.as_view()),
    path("attendance/recored/", AttendanceView.as_view()),
    path("session/end/", EndAttendanceSession.as_view()),
]
