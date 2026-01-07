from django.urls import path
from .views import (
    UserView,
    UserDetailView,
    LoginView,
    SendVerificationCodeView,
    VerifyCodeView,
)

urlpatterns = [
    path("", UserView.as_view()),
    path("<int:user_id>/", UserDetailView.as_view()),
    path("login/", LoginView.as_view()),
    path("verify/", VerifyCodeView.as_view()),
    path("send-code/", SendVerificationCodeView.as_view()),
]
